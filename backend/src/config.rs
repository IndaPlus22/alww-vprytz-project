use serde::Deserialize;
#[derive(Debug, Default, Deserialize)]
pub struct BackendConfig {
    pub server_addr: String,
    pub database_url: String,
}
