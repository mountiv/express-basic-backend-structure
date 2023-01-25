const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRETKEY;

verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unauthorized!",
      });
    }
    next();
  });
};

module.exports = {
  verifyToken,
};
