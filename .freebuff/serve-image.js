const http = require("http");
const fs = require("fs");
const path = require("path");

const file = "C:\\Users\\Israel Iraoya\\Documents\\Codes\\pharmiq\\Giga page (1).png";

http
  .createServer((req, res) => {
    if (req.url === "/" || req.url === "/image.png") {
      res.writeHead(200, { "Content-Type": "image/png" });
      fs.createReadStream(file).pipe(res);
      return;
    }
    res.writeHead(404);
    res.end("not found");
  })
  .listen(4719, "127.0.0.1", () => console.log("serving on http://127.0.0.1:4719"));
