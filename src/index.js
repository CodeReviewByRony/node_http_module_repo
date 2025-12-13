import http from "http";
import { URL } from "url";
// import querystring from "querystring";
import dotenv from "dotenv";

dotenv.config();

// const server = http.createServer((req, res) => {
//   // console.log(req.headers);

//   // demo header
//   // res.writeHead(200, { "content-type": "text/plain" });

//   // update header
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//     "X-Powered-By": "Node.js",
//     "Cache-Control": "no-cache, no-store, must-revalidate",
//     "Set-Cookie": "sessionid=abc123; HttpOnly",
//   });

//   // object কে stringify করে পাঠানো হচ্ছে
//   // multiple users

//   // const responseData = {
//   //   users: [
//   //     { name: "Rony Hossen", age: 24, status: "pending" },
//   //     { name: "Rony Hossen", age: 24, status: "pending" },
//   //     { name: "Rony Hossen", age: 24, status: "pending" },
//   //     { name: "Rony Hossen", age: 24, status: "pending" },
//   //   ],
//   // };

//   // res.end(JSON.stringify(responseData));

//   // const userAgent = req.headers["user-agent"];
//   // const acceptLanguage = req.headers["accept-language"];

//   // res.end(`User Agent : ${userAgent}\nAccept Language : ${acceptLanguage}`);

//   // const { url, method } = req;

//   // res.end(`You made a ${method} request to ${url}`);

//   // const parsedUrl = url.parse(req.url, true);

//   // console.log(parsedUrl);

//   // const pathname = parsedUrl.pathname;
//   // const query = parsedUrl.query;

//   // res.end(
//   //   JSON.stringify(
//   //     {
//   //       pathname,
//   //       query,
//   //       fullUrl: req.url,
//   //     },
//   //     null,
//   //     2
//   //   )
//   // );

//   // base url .........
//   const baseURL = `http://${req.headers.host}/`;

//   const parsedURL = new URL(req.url, baseURL);

//   // Get query parameters
//   const params = Object.fromEntries(parsedURL.searchParams);

//   // Example of building a query string
//   const queryObj = {
//     name: "John Doe",
//     age: 30,
//     interests: ["programming", "music"],
//   };
//   const queryStr = querystring.stringify(queryObj);

//   res.end(
//     JSON.stringify(
//       {
//         path: parsedURL.pathname,
//         params,
//         exampleQueryString: queryStr,
//       },
//       null,
//       2
//     )
//   );
// });

let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build an API", completed: false },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsedURL = new URL(url, `http://${req.headers.host}`);
  const pathname = parsedURL.pathname;

  // Set CORS headers (for development)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // preflight request

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // get request for path "/todos"

  if (method === "GET" && pathname === "/todos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  }
});

server.listen(process.env.PORT, "localhost", () => {
  console.log(`server start on ${process.env.PORT}`);
});
