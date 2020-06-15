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
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(500).json({ message: "catch error getById" });
    }
  });
});

router.delete("/:id", (req, res) => {
  // do your magic!

  const { id } = req.params;

  dbPosts
    .remove(id)
    .then((post) => {
      if (post && post > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch((error) => {
      console.log("catch error DELETE:", error);
      res.status(500).json({
        message: "Error removing the post",
      });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  const post = req.body;

  dbPosts
    .update(id, post)
    .then((item) => {
      res.status(200).json({ ...post, id });
    })
    .catch((error) => {
      console.log("update catch error:", error);
      res.status(500).json({ error: "The post could not be updated" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
