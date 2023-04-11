use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

// port and host
const PORT: u16 = 8080;
const HOST: &str = "127.0.0.1";

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
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind((HOST, PORT))?
    .run()
    .await
}
