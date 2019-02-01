const express = require("express");
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const serverConf = require("./config/serverconf");
const app = express();

// API
const userRouter = require("./api/user");
const genreRouter = require("./api/genre");
const localeRouter = require("./api/locale");
const bandRoutes = require("./api/band");



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
app.use("/locales", localeRouter);
app.use("/bands", bandRoutes);

app.listen(serverConf.port, serverConf.hostname, function(req, res){
  console.log(`Server started at 3000`);
})