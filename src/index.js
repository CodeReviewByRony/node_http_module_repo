
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer((req, res) => {

    // demo header
    // res.writeHead(200, { "content-type": "text/plain" });

    // update header
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': 'sessionid=abc123; HttpOnly'
    });

      // object কে stringify করে পাঠানো হচ্ছে
    const responseData = {
        user: {
            name: "Rony Hossen",
            age: 24,
            status: "pending"
        }
    };

    res.end(JSON.stringify(responseData))
})


server.listen(process.env.PORT, "localhost", () => {

    console.log(`server start on ${process.env.PORT}`)
})