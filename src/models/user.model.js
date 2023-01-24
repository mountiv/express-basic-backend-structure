const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  var user = this;
  mongoose.models["User"].findOne(
    { $or: [{ email: user.email }, { username: user.username }] },
    function (err, ouser) {
      if (ouser) {
        const duplicateErr = new Error("Email or Username duplicated!");
        next(duplicateErr);
      }
    }
  );
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = model("User", UserSchema);
