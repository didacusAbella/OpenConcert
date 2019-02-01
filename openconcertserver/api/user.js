const express = require("express");
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const driver = require("../db/driver");


var session = driver.session();

// Get users
userRouter.get("/",function (req, res) {
  session
    .run('MATCH (n:User) RETURN n.name AS name, n.lastName AS lastname, n.email AS email, n.city AS city')
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "name": element.get("name"), "lastName": element.get("lastname"), "email": element.get("email"), "city": element.get("city") });
      });
      res.json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

//Update
userRouter.put("/user/:email", function (req, res) {
  session
    .run('MATCH (n:User {email={email}}) SET n = {props} RETURN n', { email: req.params.email, props: req.body })
    .then(function (result) {
      res.status(200).json({ update: true });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

//Delete
userRouter.delete("/user/:email", function (req, res) {
  session
    .run('MATCH (n:User) WHERE n.email={email} DELETE n', { email: req.params.email })
    .then(function (result) {
      result.records.forEach(element => {
        res.status(200).json({deleted: true});
      });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ deleted: false });
    });
});

// Get single user
userRouter.get("/user/:email", function (req, res) {
  session
    .run('MATCH (n:User) WHERE n.email={email} RETURN n', { email: req.params.email })
    .then(function (result) {
      if (result.records.length == 1) {
        result.records.forEach(element => {
          res.status(200).json(element.get("n").properties);
        });
      } else {
        res.status(412).json({ exist: false });
      }
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ exist: false });
    });
})

//Get user friends
userRouter.get("/user_friends/:email", function (req, res) {
  session
    .run('MATCH (u:User)-[FRIEND]->(f:User) WHERE u.email = {email} Return f.name AS name, f.lastName AS lastname, f.city AS city, f.email AS email', { email: req.params.email })
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "name": element.get("name"), "lastName": element.get("lastname"), "email": element.get("email"), "city": element.get("city") });
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({exist: false});
    });
})

//Get user genres
userRouter.get("/user_genres/:email", function (req, res) {
  session
    .run('MATCH (u:User)-[TYPE]->(g:Genre) WHERE u.email = {email} Return g.name AS name', { email: req.params.email })
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({"genre": element.get("name")});
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({exist: false});
    });
})

//Get user locales
userRouter.get("/user_locales/:email", function (req, res) {
  session
    .run('MATCH (u:User)-[FREQUENT]->(g:Locale) WHERE u.email = {email} Return g.name AS name', { email: req.params.email })
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({"locale": element.get("name")});
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({exist: false});
    });
})

module.exports = userRouter;