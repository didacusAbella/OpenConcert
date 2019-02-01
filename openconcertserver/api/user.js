const express = require("express");
const userRouter = express.Router();
const driver = require("../db/driver");

var session = driver.session();

// Get users
userRouter.get("/", function (req, res) {
  session
    .run('MATCH (n:User) RETURN n.name AS name, n.lastName AS lastname, n.email AS email, n.city AS city')
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "Name": element.get("name"), "Last Name": element.get("lastname"), "Email": element.get("email"), "City": element.get("city") });
      });
      res.json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});


// Create
userRouter.post("/user", function (req, res) {
  session
    .run('MERGE (n:User {name:{name}, lastName:{lastname}, password:{password} ,email:{email} ,city:{city}}) RETURN n', { name: req.body.name, lastname: req.body.lastname, password: req.body.password, email: req.body.email, city: req.body.city })
    .then(function (result) {
      result.records.forEach(element => {
        res.status(200).json({ created: true });
      });
      session.close();
    })
    .catch(function (error) {
      res.status(412).json({ create: false });
    });
});

//Update
userRouter.put("/user/:email", function (req, res) {
  session
    .run('MATCH (n:User) WHERE n.email={email} SET n = {props} RETURN n', { email: req.params.email, props: req.body })
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
        res.status(200).send("User deleted");
      });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ exist: false });
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
        response.push({ "Name": element.get("name"), "Last Name": element.get("lastname"), "Email": element.get("email"), "City": element.get("city") });
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
        response.push({"Genre": element.get("name")});
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({exist: false});
    });
})




// Login
userRouter.post("/login", function (req, res) {
  session
    .run('MATCH (u:User {email : {emailParam}, password : {passwordParam} }) RETURN u', { emailParam: req.body.email, passwordParam: req.body.password })
    .then(function (result) {
      if (result.records.length == 0) {
        res.status(404).send("Not Founded");
      } else {
        res.status(200).send("Founded")
      }
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});


module.exports = userRouter;