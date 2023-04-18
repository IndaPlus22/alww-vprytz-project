use actix_web::{get, middleware, post, web, App, HttpResponse, HttpServer, Responder};

// port and host
const PORT: u16 = 8080;
const HOST: &str = "0.0.0.0";

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting server at http://{}:{}", HOST, PORT);
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::DefaultHeaders::new().add(("Server", "osqspeed-api powered by Rust")))
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind((HOST, PORT))?
    .run()
    .await
}
