use reqwest::{Client, Url};
use serde::Deserialize;

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

    let response = client.get(url).bearer_auth(access_token).send().await?;
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
