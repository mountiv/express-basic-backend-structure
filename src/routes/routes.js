module.exports = function (app) {
  app.use("/api/auth", require("./auth.router"));
  app.use("/api/post", require("./post.router"));
};
