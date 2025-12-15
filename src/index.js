// import https from "https";
// // import { URL } from "url";
// // import querystring from "querystring";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// import constants from "constants";

// dotenv.config();

// // const server = http.createServer((req, res) => {
// //   // console.log(req.headers);

// //   // demo header
// //   // res.writeHead(200, { "content-type": "text/plain" });

// //   // update header
// //   res.writeHead(200, {
// //     "Content-Type": "application/json",
// //     "X-Powered-By": "Node.js",
// //     "Cache-Control": "no-cache, no-store, must-revalidate",
// //     "Set-Cookie": "sessionid=abc123; HttpOnly",
// //   });

// //   // object কে stringify করে পাঠানো হচ্ছে
// //   // multiple users

// //   // const responseData = {
// //   //   users: [
// //   //     { name: "Rony Hossen", age: 24, status: "pending" },
// //   //     { name: "Rony Hossen", age: 24, status: "pending" },
// //   //     { name: "Rony Hossen", age: 24, status: "pending" },
// //   //     { name: "Rony Hossen", age: 24, status: "pending" },
// //   //   ],
// //   // };

// //   // res.end(JSON.stringify(responseData));

// //   // const userAgent = req.headers["user-agent"];
// //   // const acceptLanguage = req.headers["accept-language"];

// //   // res.end(`User Agent : ${userAgent}\nAccept Language : ${acceptLanguage}`);

// //   // const { url, method } = req;

// //   // res.end(`You made a ${method} request to ${url}`);

// //   // const parsedUrl = url.parse(req.url, true);

// //   // console.log(parsedUrl);

// //   // const pathname = parsedUrl.pathname;
// //   // const query = parsedUrl.query;

// //   // res.end(
// //   //   JSON.stringify(
// //   //     {
// //   //       pathname,
// //   //       query,
// //   //       fullUrl: req.url,
// //   //     },
// //   //     null,
// //   //     2
// //   //   )
// //   // );

// //   // base url .........
// //   const baseURL = `http://${req.headers.host}/`;

// //   const parsedURL = new URL(req.url, baseURL);

// //   // Get query parameters
// //   const params = Object.fromEntries(parsedURL.searchParams);

// //   // Example of building a query string
// //   const queryObj = {
// //     name: "John Doe",
// //     age: 30,
// //     interests: ["programming", "music"],
// //   };
// //   const queryStr = querystring.stringify(queryObj);

// //   res.end(
// //     JSON.stringify(
// //       {
// //         path: parsedURL.pathname,
// //         params,
// //         exampleQueryString: queryStr,
// //       },
// //       null,
// //       2
// //     )
// //   );
// // });

// // let todos = [
// //   { id: 1, task: "Design REST API using Node http module", completed: false },
// //   { id: 2, task: "Handle JSON request body", completed: false },
// //   { id: 3, task: "Test API using cURL", completed: false },
// //   { id: 4, task: "Implement CORS handling", completed: false },
// // ];

// // const server = http.createServer((req, res) => {
// //   const { method, url } = req;
// //   const parsedURL = new URL(url, `http://${req.headers.host}`);
// //   const pathname = parsedURL.pathname;

// //   // Set CORS headers (for development)
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader(
// //     "Access-Control-Allow-Methods",
// //     "GET, POST, PUT, DELETE, OPTIONS"
// //   );
// //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// //   // preflight request

// //   if (method === "OPTIONS") {
// //     res.writeHead(204);
// //     res.end();
// //     return;
// //   }

// //   // get request for path "/todos"

// //   if (method === "GET" && pathname === "/todos") {
// //     res.writeHead(200, { "Content-Type": "application/json" });
// //     res.end(JSON.stringify(todos));
// //   }

// //   // post request for path "/todos"
// //   else if (method === "POST" && pathname === "/todos") {
// //     let body = "";

// //     req.on("data", (chunk) => {
// //       body += chunk.toString();
// //     });

// //     req.on("end", () => {
// //       try {
// //         const newTodo = JSON.parse(body);
// //         newTodo.id =
// //           todos.length > 0 ? Math.max(...todos.map((i) => i.id)) + 1 : 1;
// //         todos.push(newTodo);
// //         res.writeHead(201, { "Content-Type": "application/json" });
// //         res.end(JSON.stringify(newTodo));
// //       } catch (error) {
// //         res.writeHead(400, { "Content-Type": "application/json" });
// //         res.end(JSON.stringify({ error: "Invalid JSON" }));
// //       }
// //     });
// //   }

// //   // Route: PUT /todos/:id
// //   else if (method === "PUT" && pathname.startsWith("/todos/")) {
// //     const id = Number(pathname.split("/")[2]);
// //     let body = "";

// //     req.on("data", (chunk) => {
// //       body += chunk.toString();
// //     });

// //     req.on("end", () => {
// //       try {
// //         let updateTodo = JSON.parse(body);
// //         const index = todos.findIndex((t) => t.id === id);

// //         if (index === -1) {
// //           res.writeHead(404, { "Content-Type": "application/json" });
// //           res.end(JSON.stringify({ error: "todo not found" }));
// //         } else {
// //           todos[index] = { ...todos[index], ...updateTodo };
// //           res.writeHead(200, { "Content-Type": "application/json" });
// //           res.end(JSON.stringify(todos[index]));
// //         }
// //       } catch (error) {
// //         res.writeHead(400, { "Content-Type": "application/json" });
// //         res.end(JSON.stringify({ error: "Invalid JSON" }));
// //       }
// //     });
// //   }

// //   // Route: DELETE /todos/:id
// //   else if (method === "DELETE" && pathname.startsWith("/todos/")) {
// //     const id = Number(pathname.split("/")[2]);
// //     const index = todos.findIndex((t) => t.id === id);

// //     if (index === -1) {
// //       res.writeHead(404, { "Content-Type": "application/json" });
// //       res.end(JSON.stringify({ error: "Todo not found" }));
// //     } else {
// //       todos = todos.filter((t) => t.id !== id);
// //       res.writeHead(204);
// //       res.end(JSON.stringify({ message: "element delete" }));
// //     }
// //   } // 404 Not Found
// //   else {
// //     res.writeHead(404, { "Content-Type": "application/json" });
// //     res.end(JSON.stringify({ error: "Not Found" }));
// //   }
// // });

// // server.listen(process.env.PORT, "localhost", () => {
// //   console.log(`server start on ${process.env.PORT}`);
// // });

// // Current file path
// const __filename = fileURLToPath(import.meta.url);

// // Current directory
// const __dirname = path.dirname(__filename);

// const sslOptions = {
//   key: fs.readFileSync(path.join(__dirname, "../key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "../cert.pem")),
//   minVersion: "TLSv1.2",
//   maxVersion: "TLSv1.3",
//   secureOptions:
//     constants.SSL_OP_NO_SSLv3 |
//     constants.SSL_OP_NO_TLSv1 |
//     constants.SSL_OP_NO_TLSv1_1,
// };

// const server = https.createServer(sslOptions, (req, res) => {
//   console.log(req.url);

//   // Security headers
//   res.setHeader(
//     "Strict-Transport-Security",
//     "max-age=31536000; includeSubDomains"
//   );
//   res.setHeader("X-Content-Type-Options", "nosniff");
//   res.setHeader("X-Frame-Options", "SAMEORIGIN");
//   res.setHeader("X-XSS-Protection", "1; mode=block");
//   res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

//   // simple get url ........ for https
//   if (req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("hello world");
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("404 Not Found");
//   }
// });

// // server start ................

// server.listen(process.env.PORT || 4000, () => {
//   console.log(`server start on localhost in ${process.env.PORT || 4000}`);
// });
