use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Deserialize, PostgresMapper, Serialize)]
#[pg_mapper(table = "users")] // singular 'user' is a keyword..
pub struct User {
    pub id: Option<i64>,
    pub email: String,
    pub fullname: String,
}

#[derive(Deserialize, PostgresMapper, Serialize)]
#[pg_mapper(table = "measurements")] // singular 'user' is a keyword..
pub struct Measurement {
    pub id: Option<i64>,
    pub lat: f64,
    pub lon: f64,
    pub speed: f64,
    pub latency: f64,
    pub user_id: u32,
}
