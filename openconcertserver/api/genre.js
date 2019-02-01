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
      res.json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = genreRouter;