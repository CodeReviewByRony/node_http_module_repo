
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer((req, res) => {

    res.writeHead(200, { "content-type": "text/plain" });

    res.end("hellow world");

})


server.listen(process.env.PORT, "localhost", () => {

    console.log(`server start on ${process.env.PORT}`)
})