process.env.APP_ENV = "test";

const { User } = require("../src/models");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/index");
const should = chai.should();

chai.use(chaiHttp);

describe("#Auth", function () {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe("#POST [/api/auth/check/email], Check Email for Signup", function () {
    it("the email is available.", function (done) {
      chai
        .request(server)
        .post("/api/auth/check/email")
        .send({
          email: "testuser@example.com",
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            res.should.have.status(200);
            done();
          }
        });
    });
  });

  describe("#POST [/api/auth/check/username], Check Username for Signup", function () {
    it("the username is available.", function (done) {
      chai
        .request(server)
        .post("/api/auth/check/username")
        .send({
          username: "testuser",
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            res.should.have.status(200);
            done();
          }
        });
    });
  });

  describe("#POST [/api/auth/signup], User Signup", function () {
    it("created new account successfully.", function (done) {
      chai
        .request(server)
        .post("/api/auth/signup")
        .send({
          username: "testuser",
          email: "testuser@example.com",
          social: {
            git: "@github.testuser",
            medium: "@medium.testuser",
          },
          securityQueries: {
            "Where ware you born?": "Earth",
            "What is your favorite pet name?": "Zemma",
          },
          password: "testpassword",
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            res.should.have.status(200);
            done();
          }
        });
    });
  });

  describe("#POST [/api/auth/login], User Login", function () {
    it("account logged successfully.", function (done) {
      chai
        .request(server)
        .post("/api/auth/signup")
        .send({
          username: "testuser",
          email: "testuser@example.com",
          social: {
            git: "@github.testuser",
            medium: "@medium.testuser",
          },
          securityQueries: {
            "Where ware you born?": "Earth",
            "What is your favorite pet name?": "Zemma",
          },
          password: "testpassword",
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            chai
              .request(server)
              .post("/api/auth/login")
              .send({
                username: "testuser",
                password: "testpassword",
              })
              .end((err, res) => {
                if (err) done(err);
                else {
                  res.should.have.status(200);
                  done();
                }
              });
          }
        });
    });
  });
});
