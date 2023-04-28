use serde::Deserialize;
#[derive(Debug, Default, Deserialize, Clone)]
pub struct AppConfig {
    pub server_addr: String,
    pub pg: deadpool_postgres::Config,

    pub app_url: String,
    pub oauth_auth_url: String,
    pub oauth_token_url: String,
    pub oauth_base_api_url: String,
    pub oauth_client_id: String,
    pub oauth_client_secret: String,
}
