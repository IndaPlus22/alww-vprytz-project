use serde::Deserialize;
#[derive(Debug, Default, Deserialize)]
pub struct BackendConfig {
    pub server_addr: String,
    pub pg: deadpool_postgres::Config,
}
