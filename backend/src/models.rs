use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Deserialize, PostgresMapper, Serialize)]
#[pg_mapper(table = "users")] // singular 'user' is a keyword..
pub struct User {
    pub id: Option<i64>,
    pub email: String,
    pub fullname: String,
    pub created: Option<chrono::NaiveDateTime>,
    pub updated: Option<chrono::NaiveDateTime>,
}

#[derive(Deserialize, PostgresMapper, Serialize)]
#[pg_mapper(table = "measurements")]
pub struct Measurement {
    pub id: Option<i64>,
    pub user_id: Option<i64>,
    pub lat: f64,
    pub lon: f64,
    pub altitude: f64,
    pub speed: f64,
    pub latency: f64,
    pub created: Option<chrono::NaiveDateTime>,
    pub updated: Option<chrono::NaiveDateTime>,
}

#[derive(Deserialize, PostgresMapper, Serialize)]
#[pg_mapper(table = "sessions")]
pub struct Session {
    pub id: Option<i64>,
    pub user_id: i64,
    pub token: String,
    pub created: Option<chrono::NaiveDateTime>,
    pub expires: Option<chrono::NaiveDateTime>,
}
