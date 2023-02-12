const { User } = require("../models");

updateProfile = async function (req, res) {
  try {
    if (User.findById(req.params.id).isAllowed) {
      await User.findByIdAndUpdate(req.params.id, req.body);
      const updatedUser = await User.findById(req.params.id);
      res.status(200).send(updatedUser);
    } else {
      res.status(500).send("can't update your profile, you are blocked!");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

updatePassword = async function (req, res) {
  try {
    const result = await User.updateOne(
      { _id: req.body.id },
      { password: req.body.password }
    );
    res.status(200).send("password updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

blockUser = async function (req, res) {
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      { isAllowed: false }
    );
    res.status(200).send("user blocked!");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

allowUser = async function (req, res) {
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      { isAllowed: true }
    );
    res.status(200).send("user activated!");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

deleteUser = async function (req, res) {
  try {
    if (!User.findById(req.params.id).isAllowed) {
      const result = await User.deleteOne({ _id: req.params.id });
      res.status(200).send(result);
    } else {
      res.status(500).send("can't delete activatide user!");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  updateProfile: updateProfile,
  updatePassword: updatePassword,
  blockUser: blockUser,
  allowUser: allowUser,
  deleteUser: deleteUser,
};
