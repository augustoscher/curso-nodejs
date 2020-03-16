const http = require("http");

http
  .createServer((request, response) => {
    response.end("Hello Word");
  })
  .listen(5000, () => console.log("Server está rodando!"));
