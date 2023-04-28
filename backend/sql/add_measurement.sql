INSERT INTO osqspeed.measurements(user_id, lat, lon, speed, latency)
VALUES ($1, $1, $2, $3, $4)
RETURNING $table_fields;
