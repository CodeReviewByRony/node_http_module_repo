import http from "http";
import url from "url";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer((req, res) => {
  console.log(req.headers);

  // demo header
  // res.writeHead(200, { "content-type": "text/plain" });

  // update header
  res.writeHead(200, {
    "Content-Type": "application/json",
    "X-Powered-By": "Node.js",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Set-Cookie": "sessionid=abc123; HttpOnly",
  });

  // object কে stringify করে পাঠানো হচ্ছে
  // multiple users

  // const responseData = {
  //   users: [
  //     { name: "Rony Hossen", age: 24, status: "pending" },
  //     { name: "Rony Hossen", age: 24, status: "pending" },
  //     { name: "Rony Hossen", age: 24, status: "pending" },
  //     { name: "Rony Hossen", age: 24, status: "pending" },
  //   ],
  // };

  // res.end(JSON.stringify(responseData));

  // const userAgent = req.headers["user-agent"];
  // const acceptLanguage = req.headers["accept-language"];

  // res.end(`User Agent : ${userAgent}\nAccept Language : ${acceptLanguage}`);

  // const { url, method } = req;

  // res.end(`You made a ${method} request to ${url}`);

  const parsedUrl = url.parse(req.url, true);

  // console.log(parsedUrl);

  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.end(
    JSON.stringify(
      {
        pathname,
        query,
        fullUrl: req.url,
      },
      null,
      2
    )
  );
});

server.listen(process.env.PORT, "localhost", () => {
  console.log(`server start on ${process.env.PORT}`);
});
