mod auth;
mod config;
mod db;
mod errors;
mod handlers;
mod models;

use ::config::Config;
use actix_web::{middleware, web, App, HttpServer};
use dotenv::dotenv;
use tokio_postgres::NoTls;

use handlers::add_measurement;
use handlers::add_user;
use handlers::auth_callback;
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

    let server = HttpServer::new(move || {
        App::new()
            .wrap(middleware::DefaultHeaders::new().add(("Server", "osqspeed-api powered by Rust")))
            .app_data(web::Data::new(AppData {
                pool: pool.clone(),
                config: config.clone(),
            }))
            .service(web::resource("/api/v1/auth").route(web::get().to(get_signin_url)))
            .service(web::resource("/api/v1/auth/callback").route(web::get().to(auth_callback)))
            .service(web::resource("/users").route(web::post().to(add_user)))
            .service(web::resource("/api/v1/measurements").route(web::post().to(add_measurement)))
    })
    .bind(server_addr.clone())?
    .run();
    println!("Server running at http://{}/", server_addr.clone());

    server.await
}
