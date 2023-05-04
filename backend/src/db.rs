use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;

use crate::{errors::MyError, models::Measurement, models::Session, models::User};

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
                &measurment_info.altitude,
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

pub async fn add_session(client: &Client, session_info: Session) -> Result<Session, MyError> {
    let _stmt = include_str!("../sql/add_session.sql");
    let _stmt = _stmt.replace("$table_fields", &Session::sql_table_fields());
    let stmt = client.prepare(&_stmt).await.unwrap();

    client
        .query(&stmt, &[&session_info.user_id, &session_info.token])
        .await?
        .iter()
        .map(|row| Session::from_row_ref(row).unwrap())
        .collect::<Vec<Session>>()
        .pop()
        .ok_or(MyError::NotFound) // more applicable for SELECTs
}

pub async fn get_all_measurements(client: &Client) -> Result<Vec<Measurement>, MyError> {
    let _stmt = include_str!("../sql/get_measurements.sql");
    let _stmt = _stmt.replace("$table_fields", &Measurement::sql_table_fields());
    let stmt = client.prepare(&_stmt).await.unwrap();

    Ok(client
        .query(&stmt, &[])
        .await?
        .iter()
        .map(|row| Measurement::from_row_ref(row).unwrap())
        .collect::<Vec<Measurement>>())
}

pub async fn get_measurement_by_id(client: &Client, id: i64) -> Result<Measurement, MyError> {
    let _stmt = include_str!("../sql/get_measurement_by_id.sql");
    let _stmt = _stmt.replace("$table_fields", &Measurement::sql_table_fields());
    let stmt = client.prepare(&_stmt).await.unwrap();

    client
        .query(&stmt, &[&id])
        .await?
        .iter()
        .map(|row| Measurement::from_row_ref(row).unwrap())
        .collect::<Vec<Measurement>>()
        .pop()
        .ok_or(MyError::NotFound) // more applicable for SELECTs
}

pub async fn get_session_by_token(client: &Client, token: String) -> Result<Session, MyError> {
    let _stmt = include_str!("../sql/get_session_by_token.sql");
    let _stmt = _stmt.replace("$table_fields", &Session::sql_table_fields());
    let stmt = client.prepare(&_stmt).await.unwrap();

    client
        .query(&stmt, &[&token])
        .await?
        .iter()
        .map(|row| Session::from_row_ref(row).unwrap())
        .collect::<Vec<Session>>()
        .pop()
        .ok_or(MyError::NotFound) // more applicable for SELECTs
}
