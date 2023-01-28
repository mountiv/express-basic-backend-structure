const express = require("express");
const router = express.Router();
const controller = require("../controllers/post.controller");

router.post("/create", function (req, res) {
  controller.createPost(req, res);
});

router.get("/all", function (req, res) {
  controller.readPosts(req, res);
});

router.get("/:id", function (req, res) {
  controller.readPost(req, res);
});

router.delete("/:id", function (req, res) {
  controller.deletePost(req, res);
});

router.put("/:id", function (req, res) {
  controller.updatePost(req, res);
});

module.exports = router;
