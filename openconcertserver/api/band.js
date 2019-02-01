const express = require("express");
const bandsRouter = express.Router();
const driver = require("../db/driver");

var session = driver.session();

bandsRouter.get("/", function(req, res){

});


module.exports = bandsRouter;