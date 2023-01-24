const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/check/email", function (req, res) {
  controller.checkEmail(req, res);
});

router.post("/check/username", function (req, res) {
  controller.checkUsername(req, res);
});

router.post("/signup", function (req, res) {
  controller.signup(req, res);
});

router.post("/login", function (req, res) {
  controller.login(req, res);
});

module.exports = router;
