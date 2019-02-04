const express = require("express");
const bandRouter = express.Router();
const driver = require("../db/driver");

var session = driver.session();

// Get bands
bandRouter.get("/", function (req, res) {
  session
    .run('MATCH (n:Band) RETURN n.name AS name')
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

module.exports = bandRouter;