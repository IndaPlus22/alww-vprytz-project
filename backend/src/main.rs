#[macro_use]
extern crate diesel;

use actions::find_user_by_uid;
use actix_web::{error, get, middleware, post, web, App, HttpResponse, HttpServer, Responder};
use diesel::r2d2::ConnectionManager;
use diesel::r2d2::Pool;
use diesel::PgConnection;

use uuid::Uuid;

mod actions;
mod config;
mod models;
mod schema;

use crate::config::BackendConfig;
use ::config::Config;

/// Finds user by UID.
///
/// Extracts:
/// - the database pool handle from application data
/// - a user UID from the request path
#[get("/user/{user_id}")]
async fn get_user(
    pool: PostgresPool,
    user_uid: web::Path<Uuid>,
) -> actix_web::Result<impl Responder> {
    let user_uid = user_uid.into_inner();

    // use web::block to offload blocking Diesel queries without blocking server thread
    let user = web::block(move || {
        // note that obtaining a connection from the pool is also potentially blocking
        let mut conn = pool.get()?;

        actions::find_user_by_uid(&mut conn, user_uid)
    })
    .await?
    // map diesel query errors to a 500 error response
    .map_err(error::ErrorInternalServerError)?;

    Ok(match user {
        // user was found; return 200 response with JSON formatted user object
        Some(user) => HttpResponse::Ok().json(user),

        // user was not found; return 404 response with error message
        None => HttpResponse::NotFound().body(format!("No user found with UID: {user_uid}")),
    })
}

/// Creates new user.
///
/// Extracts:
/// - the database pool handle from application data
/// - a JSON form containing new user info from the request body
#[post("/user")]
async fn add_user(
    pool: PostgresPool,
    form: web::Json<models::NewUser>,
) -> actix_web::Result<impl Responder> {
    // use web::block to offload blocking Diesel queries without blocking server thread
    let user = web::block(move || {
        // note that obtaining a connection from the pool is also potentially blocking
        let mut conn = pool.get()?;

        actions::insert_new_user(&mut conn, &form.name, &form.email)
    })
    .await?
    // map diesel query errors to a 500 error response
    .map_err(error::ErrorInternalServerError)?;

    // user was added successfully; return 201 response with new user info
    Ok(HttpResponse::Created().json(user))
}

pub type PostgresPool = Pool<ConnectionManager<PgConnection>>;
pub fn get_pool(database_url: String) -> PostgresPool {
    let migr = ConnectionManager::<PgConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(migr)
        .expect("could not build connection pool")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let config_ = Config::builder()
        .add_source(::config::Environment::default())
        .build()
        .unwrap();

    let config: BackendConfig = config_.try_deserialize().unwrap();

    // initialize DB pool outside of `HttpServer::new` so that it is shared across all workers
    let pool = get_pool(config.database_url.clone());

    let server = HttpServer::new(move || {
        App::new()
            // add DB pool handle to app data; enables use of `web::Data<DbPool>` extractor
            .app_data(web::Data::new(pool.clone()))
            // add request logger middleware
            .wrap(middleware::Logger::default())
            // add route handlers
            .service(get_user)
            .service(add_user)
    })
    .bind(config.server_addr.clone())?
    .run();
    log::info!("Server running at http://{}", config.server_addr);

    server.await
}
