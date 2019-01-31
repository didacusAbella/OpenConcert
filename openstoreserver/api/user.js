const express = require("express");
const userRouter = express.Router();
const driver = require("../db/driver");

var session = driver.session();


userRouter.get("/", function(req, res){
    session
    .run('MATCH (n:User) RETURN n.name AS name, n.lastName AS lastname, n.email AS email')
    .then(function (result) {
        response = []
      result.records.forEach(element => {
          response.push({"Name": element.get("name"), "Last Name": element.get("lastname"), "Email": element.get("email")})
      });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

userRouter.get("/login", function(req, res){
    session
  .run('MATCH (u:User {email : {emailParam}, password : {passwordParam} }) RETURN u', {nameParam: req.body.email, passwordName: req.body.password })
  .then(function (result) {
    result.records.forEach(function (record) {
      console.log(record.get('name'));
    });
    session.close();
  })
  .catch(function (error) {
    console.log(error);
  });
});


module.exports = userRouter;