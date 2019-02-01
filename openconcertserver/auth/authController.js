const express = require("express");
const jwt = require('jsonwebtoken');
const driver = require("../db/driver");
var VerifyToken = require('./verifyToken');

const authRouter = express.Router();
const session = driver.session();


// Create
authRouter.post("/signup", function (req, res) {
  session
    .run('CREATE (n:User {name:{name}, lastName:{lastname}, password:{password} ,email:{email} ,city:{city}}) RETURN n.email AS email', { name: req.body.name, lastname: req.body.lastname, password: req.body.password, email: req.body.email, city: req.body.city })
    .then(function (result) {
      result.records.forEach(element => {
        var token = jwt.sign({ email: element.get("email") }, 'secretforcreateauth', {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({ auth: true, token: token });
      });
      session.close();
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).json({ create: false });
    });
});


authRouter.get('/me', VerifyToken, function (req, res, next) {
  session
    .run('MATCH (n:User) WHERE n.email={email} RETURN n.name AS name, n.lastName AS lastname, n.city AS city, n.email AS email', { email: req.userEmail })
    .then(function (result) {
      response = [];
      if (result.records.length == 1) {
        result.records.forEach(element => {
        res.status(200).json({ "name": element.get("name"), "lastName": element.get("lastname"), "email": element.get("email"), "city": element.get("city") });
        });
      } else {
        res.status(412).json({ exist: false });
      }
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: 'There was a problem to find the user' });
    });

});


// Login
authRouter.post("/login", function (req, res) {
  session
    .run('MATCH (u:User {email : {emailParam}, password : {passwordParam} }) RETURN u.email AS email', { emailParam: req.body.email, passwordParam: req.body.password })
    .then(function (result) {
      result.records.forEach(element => {
        var token = jwt.sign({ email: element.get("email") }, 'secretforcreateauth', {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({ auth: true, token: token });
      });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to login' })
    });
});

authRouter.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});


module.exports = authRouter;