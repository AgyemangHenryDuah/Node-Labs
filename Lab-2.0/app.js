//Importing neccessary modules
const http = require("node:http");
const fs = require("node:fs");
const querystring = require("node:querystring");
const path = require("node:path")

//Gets and read users paths data repectively
const usersFilePath = path.resolve(__dirname, 'users.json')
let users = fs.readFileSync(usersFilePath,'utf-8')

//Server created and routes '/', "/users" and "/create-user" created
const server = http.createServer((request, response) => {

  if (request.url === "/" && request.method === "GET") {

    response.writeHead(200, { "Content-Type": "text/html" });
    
    const template = fs.createReadStream("./form.html");
    
    template.pipe(response);
  } else if (request.url === "/users" && request.method === "GET") {

    response.writeHead(200, { "Content-Type": "application/json" });
    
    response.end(JSON.stringify(users));

  } else if (request.url === "/create-user" && request.method === "POST") {
    
    let body = "";

    request.on("data", formInput => {
      body += formInput.toString();
    });

    request.on("end", () => {
      try {
        const parsedData = querystring.parse(body);
        const { username } = parsedData;

        if (!username) {
          response.writeHead(400, { "Content-Type": "text/plain" });
          return response.end("Error: Missing username.");
        }

        console.log(`${username}`);

        response.writeHead(302, { Location: "/" });
        response.end();

      } catch (error) {

        console.error("Error processing request:", error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Internal Server Error");
      }
    });
  } else {

    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
