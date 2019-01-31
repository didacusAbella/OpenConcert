const express = require("express");
const userRouter = express.Router();
const driver = require("../db/driver");

var session = driver.session();

// Get users
userRouter.get("/", function(req, res){
    session
    .run('MATCH (n:User) RETURN n.name AS name, n.lastName AS lastname, n.email AS email, n.city AS city')
    .then(function (result) {
        response = [];
      result.records.forEach(element => {
          response.push({"Name": element.get("name"), "Last Name": element.get("lastname"), "Email": element.get("email"), "City":element.get("city")});
      });
      res.json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});


// Create
userRouter.post("/user", function(req, res){
  session
  .run('MERGE (n:User {name:{name}, lastName:{lastname}, password:{password} ,email:{email} ,city:{city}}) RETURN n',{name: req.body.name, lastname: req.body.lastname, password:req.body.password, email:req.body.email, city: req.body.city})
  .then(function (result) {
    result.records.forEach(element => {
      res.status(200).send("User created");
    });
    session.close();
  })
  .catch(function (error) {
    res.status("412").send("Email exist");
  });
});

//Update
userRouter.put("/user", function(req, res){
  session
  .run('MATCH (n:User) WHERE n.email={email} SET n = {props} RETURN n',{email:req.body.email,props:req.body})
  .then(function (result) {
    res.status(200).send("User updated");
    session.close();
  })
  .catch(function (error) {
    console.log(error);
  });
});

//Delete
userRouter.delete("/user", function(req, res){
  session
  .run('MATCH (n:User) WHERE n.email={email} DELETE n',{email: req.body.email})
  .then(function (result) {
    result.records.forEach(element => {
      res.status(200).send("User deleted");
    });
    session.close();
  })
  .catch(function (error) {
    console.log(error);
    res.status("412").send("User not exist");
  });
});


// Login
userRouter.post("/login", function(req, res){
    session
  .run('MATCH (u:User {email : {emailParam}, password : {passwordParam} }) RETURN u', {emailParam: req.body.email, passwordParam: req.body.password})
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