use actix_web::{web, Error, HttpResponse, Responder, Result};
use deadpool_postgres::{Client, Pool};
use serde::Serialize;

use crate::{db, errors::MyError, models::Measurement, models::User};

pub async fn add_user(
    user: web::Json<User>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, Error> {
    let user_info: User = user.into_inner();

    let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

    let new_user = db::add_user(&client, user_info).await?;

    Ok(HttpResponse::Ok().json(new_user))
}

pub async fn add_measurement(
    measurement: web::Json<Measurement>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, Error> {
    let measurement_info: Measurement = measurement.into_inner();

    let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

    let new_measurement = db::add_measurement(&client, measurement_info).await?;

    Ok(HttpResponse::Ok().json(new_measurement))
}

pub async fn get_signin_url() -> Result<impl Responder> {
    #[derive(Serialize)]
    struct Response {
        url: String,
    }

    let response = Response {
        url: "https://osqspeed.com".to_string(),
    };

    Ok(web::Json(response))
}
