INSERT INTO osqspeed.measurements(user_id, lat, lon, altitude, speed, latency)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING $table_fields;
