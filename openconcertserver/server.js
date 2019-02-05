const express = require("express");
const bodyParser = require('body-parser');
const serverConf = require("./config/serverconf");
const AuthController = require('./auth/authController');
const VerifyToken = require('./auth/verifyToken');
const app = express();

// API
const userRouter = require("./api/user");
const genreRouter = require("./api/genre");
const localeRouter = require("./api/locale");
const bandRoutes = require("./api/band");



/**
 * For accept angular client
 */
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token, X-Auth-Token');

  next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/**
 * Mount router functions
 */
app.use("/auth", AuthController);
app.use("/users", VerifyToken, userRouter);
app.use("/genres", VerifyToken, genreRouter);
app.use("/locales", VerifyToken, localeRouter);
app.use("/bands", VerifyToken, bandRoutes);

app.listen(serverConf.port, serverConf.hostname, function (req, res) {
  console.log(`Server started at 3000`);
})