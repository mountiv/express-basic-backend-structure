const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.put("/profile", function (req, res) {
  controller.updateProfile(req, res);
});

router.post("/profile/password-reset", function (req, res) {
  controller.updatePassword(req, res);
});

router.post("/profile/block/:id", function (req, res) {
  controller.blockUser(req, res);
});

router.post("/profile/allow/:id", function (req, res) {
  controller.allowUser(req, res);
});

router.delete("/profile/:id", function (req, res) {
  controller.deleteUser(req, res);
});

module.exports = router;
