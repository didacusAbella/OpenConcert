const express = require("express");
const app = express();
const serverConf = require("./config/serverconf");
const userRouter = require("./api/user");
const trackRouter = require("./api/track");

/**
 * For accept angular client
 */
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

/**
 * Mount router functions
 */
app.use("/tracks", trackRouter);
app.use("/users", userRouter);

app.listen(serverConf.port, serverConf.hostname, function(req, res){
  console.log(`Server started at 3000`);
})