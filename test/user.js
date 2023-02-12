process.env.APP_ENV = "test";

const jwt_decode = require("jwt-decode");
const { User } = require("../src/models");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/index");
const should = chai.should();

chai.use(chaiHttp);

let token = "";

describe("#User", function () {
  beforeEach((done) => {
    User.deleteMany({})
      .then(function () {
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
                    res.body.should.be.a("object");
                    res.body.should.have.property("token");
                    token =
                      res.body.should.have.property("token").__flags.object;
                    username = jwt_decode(token).username;
                    done();
                  }
                });
            }
          });
      })
      .catch(function (err) {
        done(err);
      });
  });

  describe("#PUT [/api/user/profile], Write Profile or update profile", function () {
    it("update profile", function (done) {
      chai
        .request(server)
        .put("/api/user/profile")
        .set("Authorization", "Bearer " + token)
        .send({
          firstname: "John",
          lastname: "Doe",
          title: "writer",
          summary:
            "I am a professional writer in Medium, Facebook, Twitter and LinkedIn.",
          street: "721 N Snelling Ave",
          city: "St Paul",
          state: "Minnesota",
          country: "United States",
          mobile: "1-878-295-4088",
          telephone: "(651) 645-2647",
          zipcode: "55104",
          interest: ["writing", "movie", "spotify", "trip"],
          social: {
            medium: "johndoewriter",
            facebook: "johndoewriter",
            twitter: "johndoewriter",
            linkedin: "johndoewriter",
          },
          securityQueries: {
            "Where ware you born?": "Earth",
            "What is your favorite pet name?": "Zemma",
          },
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("msg")
              .equal("profile updated successfully");
            done();
          }
        });
    });
  });

  describe("#POST [/api/user/profile/password-reset], Change Password", function () {
    it("password reset", function (done) {
      chai
        .request(server)
        .post("/api/user/profile/password-reset")
        .set("Authorization", "Bearer " + token)
        .send({
          password: "updated_testpassword",
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").equal("password updated");
            done();
          }
        });
    });
  });

  describe("#POST [/api/user/profile/block], Block User", function () {
    it("block user for this website", function (done) {
      chai
        .request(server)
        .post("/api/user/profile/block")
        .set("Authorization", "Bearer " + token)
        .send({
          username: "testuser",
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").equal("user blocked!");
            done();
          }
        });
    });
  });

  describe("#POST [/api/user/profile/allow], Allow User", function () {
    it("activate blocked/deactivated user", function (done) {
      chai
        .request(server)
        .post("/api/user/profile/allow")
        .set("Authorization", "Bearer " + token)
        .send({
          username: "testuser",
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").equal("user activated!");
            done();
          }
        });
    });
  });

  describe("#DELETE [/api/user/profile], Delete User", function () {
    it("delete user", function (done) {
      chai
        .request(server)
        .delete("/api/user/profile")
        .set("Authorization", "Bearer " + token)
        .send({
          username: "testuser",
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            res.should.have.status(500);
            res.body.should.be.a("object");
            res.body.should.have
              .property("msg")
              .equal("can not delete activated user!");
            done();
          }
        });
    });
  });
});
