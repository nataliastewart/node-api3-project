const express = require("express");

const dbUsers = require("./userDb");
const dbPosters = require("../posts/postDb");

const router = express.Router();

router.post("/", requires("name"), (req, res) => {
  // do your magic!

  dbUsers
    .insert(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log("post a new user ERROR:", error);
    });
});

router.post("/:id/posts", async (req, res) => {
  // do your magic!
  const { id } = req.params;
  const newPost = req.body;
  try {
    const added = await dbPosters.insert({ user_id: id, ...newPost });
    res.status(201).json(added);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database",
    });
  }

  // dbPosters
  //   .insert({ user_id: id, ...newPost })
  //   .then((post) => {
  //     res.status(201).json(post);
  //   })
  //   .catch((error) => {
  //     console.log("catch error", error);
  //     res.status(500).json({
  //       error: "There was an error while saving the post to the database",
  //     });
  //   });
});

router.get("/", (req, res) => {
  // do your magic!
  dbUsers
    .get(req.body)
    .then((users) => {
      res.status(200).json({ headers: req.headers, users });
    })
    .catch((error) => {
      console.log("GET users catch error:", error);
      res.status(500).json({ error: "catch error GET users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!

  res.status(200).json(req.user);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  const { id } = req.params;
  const user = req.body;

  dbUsers.getUserPosts(id).then((item) => {
    if (item.id == user.id) {
      res.status(200).json(item);
    } else {
      res.status(500).json({ message: "catch error user getUserPosts" });
    }
  });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  // const user = req.body;

  dbUsers.remove(id).then((item) => {
    if (item == item > 0) {
      res.status(200).json({ message: `The user ${id} has been deleted` });
    } else {
      res.status(500).json({
        message: "Error removing the user",
      });
    }
  });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  const user = req.body;

  dbUsers.update(id, user).then((item) => {
    if ((item = id)) {
      res.status(201).json({ ...user });
    } else {
      res.status(500).json({ error: "The post could not be updated" });
    }
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  dbUsers.getById(id).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(500).json({ message: "from middleware: user not found" });
    }
  });
}

function requires(prop) {
  return function (req, res, next) {
    //validateUser
    if (req.body[prop]) {
      next();
    } else {
      res.status(400).json({
        message: `from middleware: Please provide the ${prop}`,
      });
    }
  };
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
