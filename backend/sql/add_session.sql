INSERT INTO osqspeed.sessions(user_id, token)
VALUES ($1, $2)
RETURNING $table_fields;
