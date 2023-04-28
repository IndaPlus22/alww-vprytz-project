FROM rust:slim

WORKDIR /var/www/app

COPY . /tmp/app

RUN apt update && apt install -y libssl-dev pkg-config
RUN cd /tmp/app && cargo build --release
RUN mv /tmp/app/target/release/osqspeed-api /var/www/app/osqspeed-api
RUN rm -rf /tmp/app

EXPOSE 5000

CMD ["/var/www/app/osqspeed-api"]
