// Create web server
// Load the http module to create an http server.
var http = require("http");
var url = require("url");
var fs = require("fs");

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var path = url.parse(request.url).pathname;
  switch (path) {
    case "/":
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("Hello World\n");
      response.end();
      break;
    case "/comments":
      fs.readFile(__dirname + "/comments.json", function (err, data) {
        if (err) {
          console.log(err);
          response.writeHead(500);
          response.end("Server Error!");
          return;
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(data);
        response.end();
      });
      break;
    default:
      response.writeHead(404);
      response.end("Not found");
      break;
  }
});

// Listen on port 8000, IP defaults to
