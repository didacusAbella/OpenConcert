const express = require("express");
const bodyParser = require('body-parser');
const serverConf = require("./config/serverconf");
const AuthController = require('./auth/authController');
const VerifyToken = require('./auth/verifyToken');
const app = express();
const cors = require("cors")

// API
const userRouter = require("./api/user");
const genreRouter = require("./api/genre");
const localeRouter = require("./api/locale");
const bandRoutes = require("./api/band");



/**
 * For accept angular client
 */
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));


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