const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { DEV_DBPATH, TEST_DBPATH } = require("./config/db.config");
const host = process.env.HOST;
const port = process.env.PORT;
const db = process.env.NODE_ENV == "dev" ? DEV_DBPATH : TEST_DBPATH;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db);
  console.log(`${process.env.NODE_ENV}db connected`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.status(200).send("Server works!");
});

app.use("*", function (req, res) {
  console.log(req);
  res.status(404).send("Can't found this page!");
});

app.listen(port, () => {
  console.log(
    `${process.env.NODE_ENV} server running on http://${host}:${port}`
  );
});
