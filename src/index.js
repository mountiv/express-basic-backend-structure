const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const config = require("./config/db.config");
const host = process.env.APP_HOST;
const port =
  process.env.APP_ENV == "development"
    ? process.env.APP_PORT
    : Number(process.env.APP_PORT) + 1;
const db =
  process.env.APP_ENV == "development"
    ? config.development.DB_PATH
    : config.test.DB_PATH;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db);
  // console.log(`${process.env.APP_ENV} database connected`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.status(200).send("Server works!");
});

require("./routes/routes")(app);

app.use("*", function (req, res) {
  res.status(404).send("Can't found this API!");
});

app.listen(port, () => {
  console.log(
    `${process.env.APP_ENV} server running on http://${host}:${port}`
  );
});

module.exports = app;
