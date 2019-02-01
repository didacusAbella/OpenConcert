const express = require("express");
const localeRouter = express.Router();
const driver = require("../db/driver");

var session = driver.session();

// Get locales
localeRouter.get("/", function (req, res) {
  session
    .run('MATCH (n:Locale) RETURN n.name AS name, n.city AS city, n.number AS number')
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "Name": element.get("name"), "City": element.get("city"), "Number": element.get("number")});
      });
      res.json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});


// Create locale
localeRouter.post("/locale", function (req, res) {
    session
      .run('CREATE (n:Locale {name:{name}, city:{city}, number:{number}}) RETURN n', { name: req.body.name, city: req.body.city, number: req.body.number})
      .then(function (result) {
        result.records.forEach(element => {
          res.status(200).json({ Created: true });
        });
        session.close();
      })
      .catch(function (error) {
          console.log(error)
        res.status(412).json({ Create: false });
      });
  });


//Delete
localeRouter.delete("/locale/:name", function (req, res) {
    session
      .run('MATCH (n:Locale) WHERE n.name={name} DELETE n', { name: req.params.name })
      .then(function (result) {
        result.records.forEach(element => {
          res.status(200).json({Deleted:true});
        });
        session.close();
      })
      .catch(function (error) {
        console.log(error);
        res.status(412).json({ Deleted: false });
      });
  });

//Update
localeRouter.put("/locale/:name", function (req, res) {
    session
      .run('MERGE (n:Locale {name:{name}})SET n = {props} RETURN n', { name: req.params.name, props:req.body })
      .then(function (result) {
          console.log(result.records)
          res.status(200).json({Update:true});

        session.close();
      })
      .catch(function (error) {
        console.log(error);
        res.status(412).json({ Update: false });
      });
  });
module.exports = localeRouter;