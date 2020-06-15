// code away!

const express = require("express");
const server = express();

//import the router
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
//middleware
server.use(express.json());

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
//use routes and endpoits
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);
server.use(logger);

server.listen(8000, () => {
  console.log("\n*** Server Running on http://localhost:8000 ***\n");
});
