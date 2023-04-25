INSERT INTO osqpseed.users(email, fullname)
VALUES ($1, $2)
RETURNING $table_fields;
