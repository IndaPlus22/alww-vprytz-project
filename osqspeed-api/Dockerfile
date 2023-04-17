FROM rust:slim

WORKDIR /var/www/app

COPY . .

RUN cargo build --release
RUN rm src/*.rs
RUN cp target/release/osqspeed-api /var/www/app/osqspeed-api
# COPY /var/www/app/target/release/osqspeed-api ./osqspeed-api

EXPOSE 8080

CMD ["/var/www/app/osqspeed-api"]
