use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;

use crate::{errors::MyError, models::Measurement, models::User};

pub async fn add_user(client: &Client, user_info: User) -> Result<User, MyError> {
    let _stmt = include_str!("../sql/add_user.sql");
    let _stmt = _stmt.replace("$table_fields", &User::sql_table_fields());
    let stmt = client.prepare(&_stmt).await.unwrap();

    client
        .query(&stmt, &[&user_info.email, &user_info.fullname])
        .await?
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>()
        .pop()
        .ok_or(MyError::NotFound) // more applicable for SELECTs
}

pub async fn get_user_by_email(client: &Client, email: String) -> Result<User, MyError> {
    let _stmt = include_str!("../sql/get_user_by_email.sql");
    let _stmt = _stmt.replace("$table_fields", &User::sql_table_fields());
    let stmt = client.prepare(&_stmt).await.unwrap();

    client
        .query(&stmt, &[&email])
        .await?
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>()
        .pop()
        .ok_or(MyError::NotFound) // more applicable for SELECTs
}

pub async fn add_measurement(
    client: &Client,
    measurment_info: Measurement,
) -> Result<Measurement, MyError> {
    let _stmt = include_str!("../sql/add_measurement.sql");
    let _stmt = _stmt.replace("$table_fields", &Measurement::sql_table_fields());
    let stmt = client.prepare(&_stmt).await.unwrap();

    client
        .query(
            &stmt,
            &[
                &measurment_info.user_id,
                &measurment_info.lat,
                &measurment_info.lon,
                &measurment_info.speed,
                &measurment_info.latency,
            ],
        )
        .await?
        .iter()
        .map(|row| Measurement::from_row_ref(row).unwrap())
        .collect::<Vec<Measurement>>()
        .pop()
        .ok_or(MyError::NotFound) // more applicable for SELECTs
}
