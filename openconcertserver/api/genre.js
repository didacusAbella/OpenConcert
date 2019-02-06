const express = require("express");
const genreRouter = express.Router();
const driver = require("../db/driver");

var session = driver.session();

// Get genres
genreRouter.get("/", function (req, res) {
  session
    .run('MATCH (n:Genre) RETURN n.name AS name')
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "genre": element.get("name")});
      });
      res.status(200).json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

genreRouter.get("/genre_bands/:name", function (req, res) {
  session
    .run('MATCH (b:Band) -[TYPE]->(Genre {name:{name}}) RETURN b.name AS name',{name: req.params.name})
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "band": element.get("name") });
      });
      res.status(200).json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = genreRouter;