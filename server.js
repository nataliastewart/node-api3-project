const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const { password } = req.headers;

  if (password) {
    if (password === "secret") {
      next();
    } else {
      res.status(401).json({ error: "Wrong password!" });
    }
  } else {
    res.status(400).json({ error: "bad request, no password provided!" });
  }
}
server.use(express.json());
server.use(logger);
module.exports = server;
