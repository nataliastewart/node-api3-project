// code away!

const express = require("express");
const server = express();

//import the router
const postRouter = require("./posts/postRouter");
const usersRouter = require("./users/userRouter");
//middleware
server.use(express.json());

//use routes and endpoits
server.use("/api/posts", postRouter);
server.use("/api/users", usersRouter);

server.listen(8000, () => {
  console.log("\n*** Server Running on http://localhost:8000 ***\n");
});
