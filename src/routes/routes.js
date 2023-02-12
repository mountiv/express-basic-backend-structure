const { isAuth } = require("../middleware");

module.exports = function (app) {
  app.use("/api/auth", require("./auth.router"));
  app.use("/api/post", [isAuth.verifyToken], require("./post.router"));
  app.use("/api/user", [isAuth.verifyToken], require("./user.router"));
};
