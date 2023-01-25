const express = require("express");
const router = express.Router();
const controller = require("../controllers/post.controller");

router.post("/create", function (req, res) {
  controller.createPost(req, res);
});

router.get("/all", function (req, res) {
  controller.readPosts(req, res);
});

module.exports = router;
