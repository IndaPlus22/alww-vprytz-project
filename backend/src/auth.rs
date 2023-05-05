use actix_web::HttpRequest;
use deadpool_postgres;
use reqwest::{Client, Url};
use serde::Deserialize;

use crate::db;

#[derive(Deserialize, Debug)]
pub struct OAuthResult {
    pub email: String,
    pub name: String,
}

pub async fn get_user_email(
    oauth_base_api_url: String,
    access_token: &str,
    // id_token: &str,
) -> Result<OAuthResult, Box<dyn std::error::Error>> {
    let client = Client::new();

    // get user email
    let mut url = Url::parse((oauth_base_api_url + "/user").as_str()).unwrap();
    url.query_pairs_mut().append_pair("alt", "json");
    url.query_pairs_mut()
        .append_pair("access_token", access_token);

    println!("Performing GET request to: {:?}", url);

    let response = client
        .get(url)
        .header("Accept", "application/json")
        .header("User-Agent", "Rust")
        .bearer_auth(access_token)
        .send()
        .await?;

    println!("response: {:?}", response);

    let response_status = response.status().is_success();
    let response_json = response.json::<OAuthResult>().await?;

    println!("response: {:?}", response_json);

    if response_status {
        return Ok(response_json);
    } else {
        let message = "An error occurred while trying to retrieve user information.";
        return Err(From::from(message));
    }
}

pub async fn verify_session_by_header(
    req: HttpRequest,
    client: &deadpool_postgres::Client,
) -> Option<i64> {
    let token = req.headers().get("Authorization");

    if token.is_none() {
        return None;
    }

    let token = token.unwrap().to_str().unwrap();

    if !token.starts_with("Bearer ") {
        return None;
    }

    let token = token.replace("Bearer ", "");

    // query in database
    let session = db::get_session_by_token(&client, token).await;

    if session.is_err() {
        return None;
    }

    let session = session.unwrap();

    // if session has expired
    if session.expires.unwrap() < chrono::Utc::now().naive_local() {
        return None;
    }

    // return user id
    return Some(session.user_id);
}
