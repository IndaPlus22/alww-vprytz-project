DROP SCHEMA IF EXISTS osqspeed CASCADE;
CREATE SCHEMA osqspeed;

CREATE TABLE osqspeed.users (
    id  BIGSERIAL PRIMARY KEY,
    email       VARCHAR(200) NOT NULL,
    fullname    VARCHAR(200) NOT NULL,
    created     timestamp default current_timestamp,
    updated     timestamp default current_timestamp,
    UNIQUE (email)
);

CREATE TABLE osqspeed.measurements (
    id  BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    speed       FLOAT NOT NULL,
    latency     FLOAT NOT NULL,
    lat         FLOAT NOT NULL,
    lon         FLOAT NOT NULL,
    created     timestamp default current_timestamp,
    updated     timestamp default current_timestamp,
    FOREIGN KEY (user_id) REFERENCES osqspeed.users(id)
);

CREATE TABLE osqspeed.sessions (
    id  BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    token       VARCHAR(200) NOT NULL,
    created     timestamp default current_timestamp,
    expires     timestamp default current_timestamp + interval '1 day',
    FOREIGN KEY (user_id) REFERENCES osqspeed.users(id)
);
