const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstname: { type: String },
      lastname: { type: String },
    },
    title: { type: String },
    summary: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    mobile: { type: String },
    telephone: { type: String },
    zipcode: { type: String },
    interest: [{ type: String }],
    socialMediaHandles: {
      type: Map,
      of: String,
    },
    securityQueries: {
      type: Map,
      of: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAllowed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  var user = this;
  /** This part is validating email and username duplication.
   * When we reset the password, this part check the email and username duplication and always occurs duplication error.
   * E11000 duplicate key error collection: blog_development.users index: email_1 dup key: { email: "testuser@example.com" }
   * So that, I removed this part.
   * When a user registers, input action frontend-side will call email and username duplication check apis and will not duplication.  */

  // mongoose.models["User"].findOne(
  //   { $or: [{ email: user.email }, { username: user.username }] },
  //   function (err, ouser) {
  //     if (ouser) {
  //       const duplicateErr = new Error("Email or Username duplicated!");
  //       next(duplicateErr);
  //     }
  //   }
  // );

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
