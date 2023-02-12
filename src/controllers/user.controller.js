const jwt_decode = require("jwt-decode");
const { User } = require("../models");

updateProfile = async function (req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const username = jwt_decode(token).username;
    console.log(username);
    User.findOne({ username: username }).then((user) => {
      if (!user) {
        res.status(500).json({ msg: "user not found" });
      }
      if (!user.isAllowed) {
        res
          .status(500)
          .json({ msg: "can't update your profile, you are blocked!" });
      } else {
        console.log(user);
        user.name.firstname = req.body.firstname;
        user.name.lastname = req.body.lastname;
        user.title = req.body.title;
        user.summary = req.body.summary;
        user.address.street = req.body.street;
        user.address.city = req.body.city;
        user.address.state = req.body.state;
        user.address.country = req.body.country;
        user.mobile = req.body.mobile;
        user.telephone = req.body.telephone;
        user.zipcode = req.body.zipcode;
        user.interest = req.body.interest;
        user.socialMediaHandles = req.body.social;
        user.securityQueries = req.body.securityQueries;
        user.save();
      }
    });
    res.status(200).json({ msg: "profile updated" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

updatePassword = async function (req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const username = jwt_decode(token).username;

    User.findOne({ username: username }).then((user) => {
      if (!user) res.status(500).json({ msg: "user not found" });
      user.password = req.body.password;
      user.save();
    });
    res.status(200).json({ msg: "password updated" });
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
    res.status(200).json({ msg: "user blocked!" });
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
    res.status(200).json({ msg: "user activated!" });
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
      res.status(500).json({ msg: "can't delete activatide user!" });
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
