INSERT INTO osqspeed.users(email, fullname)
VALUES ($1, $2)
RETURNING $table_fields;
