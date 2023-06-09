use actix_web::{web, Error, HttpRequest, HttpResponse, Responder, Result};
use deadpool_postgres::Client;
use oauth2::{
    basic::BasicClient, reqwest::async_http_client, AuthUrl, AuthorizationCode, ClientId,
    ClientSecret, CsrfToken, RedirectUrl, Scope, TokenResponse, TokenUrl,
};
use rand::distributions::Alphanumeric;
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};

use crate::auth::verify_session_by_header;
use crate::{
    auth::get_user_email,
    db,
    errors::MyError,
    models::Measurement,
    models::{Session, User},
    AppData,
};

pub async fn add_measurement(
    req: HttpRequest,
    measurement: web::Json<Measurement>,
    app_data: web::Data<AppData>,
) -> Result<HttpResponse, Error> {
    let db_pool = &app_data.pool;
    let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

    let user_id = verify_session_by_header(req, &client).await;

    if user_id.is_none() {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let measurement_info: Measurement = measurement.into_inner();
    let measurement_info = Measurement {
        user_id: user_id,
        ..measurement_info
    };

    let new_measurement = db::add_measurement(&client, measurement_info).await?;

    Ok(HttpResponse::Ok().json(new_measurement))
}

pub async fn get_measurement(
    path: web::Path<i64>,
    app_data: web::Data<AppData>,
) -> Result<impl Responder> {
    let db_pool = &app_data.pool;
    let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

    let measurement = db::get_measurement_by_id(&client, path.into_inner()).await?;

    Ok(HttpResponse::Ok().json(measurement))
}

pub async fn get_all_measurements(app_data: web::Data<AppData>) -> Result<impl Responder> {
    let db_pool = &app_data.pool;
    let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

    let measurements = db::get_all_measurements(&client).await?;

    Ok(HttpResponse::Ok().json(measurements))
}

pub async fn get_signin_url(app_data: web::Data<AppData>) -> Result<impl Responder> {
    let oauth_client_id = ClientId::new(app_data.config.oauth_client_id.clone());
    let oauth_client_secret = ClientSecret::new(app_data.config.oauth_client_secret.clone());
    let auth_url = AuthUrl::new(app_data.config.oauth_auth_url.clone())
        .expect("Invalid authorization endpoint URL");
    let token_url =
        TokenUrl::new(app_data.config.oauth_token_url.clone()).expect("Invalid token endpoint URL");

    // Set up the config for the Github OAuth2 process.
    let client = BasicClient::new(
        oauth_client_id,
        Some(oauth_client_secret),
        auth_url,
        Some(token_url),
    )
    .set_redirect_uri(
        RedirectUrl::new(app_data.config.app_url.clone() + "/api/v1/auth/callback")
            .expect("Invalid redirect URL"),
    );

    // Generate the authorization URL to which we'll redirect the user.
    let (authorize_url, _) = client
        .authorize_url(CsrfToken::new_random)
        // This example is requesting access to the user's public repos and email.
        .add_scope(Scope::new("user:email".to_string()))
        .url();

    #[derive(Serialize)]
    struct Response {
        url: String,
    }

    let response = Response {
        url: authorize_url.to_string(),
    };

    Ok(web::Json(response))
}

pub async fn auth_callback(
    req: HttpRequest,
    app_data: web::Data<AppData>,
) -> Result<impl Responder> {
    #[derive(Debug, Deserialize)]
    pub struct Params {
        code: String,
    }

    #[derive(Serialize)]
    struct Response {
        user: User,
        session: Session,
    }

    let params = web::Query::<Params>::from_query(req.query_string()).unwrap();

    let oauth_client_id = ClientId::new(app_data.config.oauth_client_id.clone());
    let oauth_client_secret = ClientSecret::new(app_data.config.oauth_client_secret.clone());
    let auth_url = AuthUrl::new(app_data.config.oauth_auth_url.clone())
        .expect("Invalid authorization endpoint URL");
    let token_url =
        TokenUrl::new(app_data.config.oauth_token_url.clone()).expect("Invalid token endpoint URL");

    // Set up the config for the Github OAuth2 process.
    let client = BasicClient::new(
        oauth_client_id,
        Some(oauth_client_secret),
        auth_url,
        Some(token_url),
    )
    .set_redirect_uri(
        RedirectUrl::new(app_data.config.app_url.clone() + "/api/v1/auth/callback")
            .expect("Invalid redirect URL"),
    );

    // Now you can trade it for an access token.
    let token_res = client
        .exchange_code(AuthorizationCode::new(params.code.clone()))
        .request_async(async_http_client)
        .await;

    // print token
    println!("login: {:?}", token_res);

    if let Ok(token) = token_res {
        let user_res = get_user_email(
            app_data.config.oauth_base_api_url.clone(),
            token.access_token().secret(),
        )
        .await;

        if let Ok(user) = user_res {
            // check if user exists in db
            let db_pool = &app_data.pool;
            let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

            let email = user.email.clone();
            let fullname = user.name.clone();

            let user = db::get_user_by_email(&client, user.email.clone()).await;

            // if user is MyError:NotFound, add user to db
            if let Err(user) = user {
                // check if not found
                if let MyError::NotFound = user {
                    // add user to db
                    let new_user = User {
                        id: None,
                        created: None,
                        updated: None,
                        email: email,
                        fullname: fullname,
                    };

                    let new_user = db::add_user(&client, new_user).await?;

                    // create session
                    let new_session = Session {
                        id: None,
                        user_id: new_user.id.unwrap(),
                        created: None,
                        expires: None,
                        // generate random 30 char string as token
                        token: thread_rng() // copied from https://rust-lang-nursery.github.io/rust-cookbook/algorithms/randomness.html#create-random-passwords-from-a-set-of-alphanumeric-characters
                            .sample_iter(&Alphanumeric)
                            .take(30)
                            .map(char::from)
                            .collect(),
                    };

                    // add session to db
                    let new_session = db::add_session(&client, new_session).await?;

                    // return user info + session token
                    return Ok(web::Json(Response {
                        user: new_user,
                        session: new_session,
                    }));
                };
            } else if let Ok(user) = user {
                // create session
                let new_session = Session {
                    id: None,
                    user_id: user.id.unwrap(),
                    created: None,
                    expires: None,
                    // generate random 30 char string as token
                    token: thread_rng() // copied from https://rust-lang-nursery.github.io/rust-cookbook/algorithms/randomness.html#create-random-passwords-from-a-set-of-alphanumeric-characters
                        .sample_iter(&Alphanumeric)
                        .take(30)
                        .map(char::from)
                        .collect(),
                };

                // add session to db
                let new_session = db::add_session(&client, new_session).await?;

                // return user info + session token
                return Ok(web::Json(Response {
                    user: user,
                    session: new_session,
                }));
            } else {
            }
        } else {
            return Err(MyError::BadRequest.into());
        }
    } else {
        return Err(MyError::BadRequest.into());
    }
    return Err(MyError::BadRequest.into());
}

pub async fn get_current_user(
    req: HttpRequest,
    app_data: web::Data<AppData>,
) -> Result<impl Responder> {
    let db_pool = &app_data.pool;
    let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

    let user_id = verify_session_by_header(req, &client).await;

    if user_id.is_none() {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let user = db::get_user_by_id(&client, user_id.unwrap()).await?;

    Ok(HttpResponse::Ok().json(user))
}
