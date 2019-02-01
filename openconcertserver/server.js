const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const serverConf = require("./config/serverconf");
const userRouter = require("./api/user");
const genreRouter = require("./api/genre");


/**
 * For accept angular client
 */
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * Mount router functions
 */
app.use("/users", userRouter);
app.use("/genres", genreRouter);

app.listen(serverConf.port, serverConf.hostname, function(req, res){
  console.log(`Server started at 3000`);
})