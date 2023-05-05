mod auth;
mod config;
mod db;
mod errors;
mod handlers;
mod models;

use ::config::Config;
use actix_web::middleware::Logger;
use actix_web::{middleware, web, App, HttpServer};
use dotenv::dotenv;
use env_logger::Env;
use tokio_postgres::NoTls;

use handlers::add_measurement;
use handlers::auth_callback;
use handlers::get_all_measurements;
use handlers::get_current_user;
use handlers::get_measurement;
use handlers::get_signin_url;

use crate::config::AppConfig;

pub struct AppData {
    pool: deadpool_postgres::Pool,
    config: AppConfig,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let config_ = Config::builder()
        .add_source(::config::Environment::default())
        .build()
        .unwrap();

    let config: AppConfig = config_.try_deserialize().unwrap();
    let server_addr = config.server_addr.clone();

    let pool = config.pg.create_pool(None, NoTls).unwrap();

    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let server = HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .wrap(middleware::DefaultHeaders::new().add(("x-powered-by", "Rust and actix-web <3")))
            .app_data(web::Data::new(AppData {
                pool: pool.clone(),
                config: config.clone(),
            }))
            .service(web::resource("/api/v1/auth").route(web::get().to(get_signin_url)))
            .service(web::resource("/api/v1/user").route(web::get().to(get_current_user)))
            .service(web::resource("/api/v1/auth/callback").route(web::get().to(auth_callback)))
            .service(
                web::resource("/api/v1/measurements")
                    .route(web::post().to(add_measurement))
                    .route(web::get().to(get_all_measurements)),
            )
            .service(
                web::resource("/api/v1/measurements/{id}").route(web::get().to(get_measurement)),
            )
    })
    .bind(server_addr.clone())?
    .run();
    println!("Server running at http://{}/", server_addr.clone());

    server.await
}
