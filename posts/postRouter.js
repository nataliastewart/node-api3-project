const express = require("express");

const dbPosts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  dbPosts
    .get(req.body)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log("GET posts catch error:", error);
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  dbPosts.getById(id).then((post) => {
    if (post.id == id) {
      res.status(200).json(post);
    } else {
      res.status(500).json({ message: "catch error getById" });
    }
  });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
