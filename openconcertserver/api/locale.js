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
        response.push({ "name": element.get("name"), "city": element.get("city"), "number": element.get("number") });
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
    .run('CREATE (n:Locale {name:{name}, city:{city}, number:{number}}) RETURN n', { name: req.body.name, city: req.body.city, number: req.body.number })
    .then(function (result) {
      result.records.forEach(element => {
        res.status(200).json({ created: true });
      });
      session.close();
    })
    .catch(function (error) {
      console.log(error)
      res.status(412).json({ create: false });
    });
});


//Delete
localeRouter.delete("/locale/:name", function (req, res) {
  session
    .run('MATCH (n:Locale) WHERE n.name={name} DELETE n', { name: req.params.name })
    .then(function (result) {
      result.records.forEach(element => {
        res.status(200).json({ deleted: true });
      });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ deleted: false });
    });
});

//Update
localeRouter.put("/locale/:name", function (req, res) {
  session
    .run('MERGE (n:Locale {name:{name}})SET n = {props} RETURN n', { name: req.params.name, props: req.body })
    .then(function (result) {
      console.log(result.records)
      res.status(200).json({ update: true });

      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ update: false });
    });
});


localeRouter.get("/locale_bands/:name", function (req, res) {
  session
    .run('MATCH (b:Band) -[PLAYED]->(Locale {name:{name}}) RETURN b.name AS name', { name: req.params.name })
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "band": element.get("name") });
      });
      res.json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = localeRouter;