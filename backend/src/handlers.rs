use actix_web::{web, Error, HttpResponse, Responder, Result};
use deadpool_postgres::Client;
use serde::Serialize;

use crate::{db, errors::MyError, models::Measurement, models::User, AppData};

pub async fn add_user(
    user: web::Json<User>,
    app_data: web::Data<AppData>,
) -> Result<HttpResponse, Error> {
    let user_info: User = user.into_inner();

    let db_pool = &app_data.pool;
    let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

    let new_user = db::add_user(&client, user_info).await?;

    Ok(HttpResponse::Ok().json(new_user))
}

pub async fn add_measurement(
    measurement: web::Json<Measurement>,
    app_data: web::Data<AppData>,
) -> Result<HttpResponse, Error> {
    let measurement_info: Measurement = measurement.into_inner();

    let db_pool = &app_data.pool;
    let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

    let new_measurement = db::add_measurement(&client, measurement_info).await?;

    Ok(HttpResponse::Ok().json(new_measurement))
}

pub async fn get_signin_url(app_data: web::Data<AppData>) -> Result<impl Responder> {
    let redirect_uri = app_data.config.app_url.clone() + "/api/v1/auth/callback";
    let url = app_data.config.oauth_base_url.clone()
        + "?client_id="
        + &app_data.config.oauth_client_id
        + "&redirect_uri="
        + &redirect_uri
        + "&scope=user:email";

    #[derive(Serialize)]
    struct Response {
        url: String,
    }

    let response = Response { url: url };

    Ok(web::Json(response))
}
