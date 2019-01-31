const express = require("express");
const tracksRouter = express.Router();
const driver = require("../db/driver");

var session = driver.session();

tracksRouter.get("/", function(req, res){

});


module.exports = tracksRouter;