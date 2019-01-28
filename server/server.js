const express = require("express");
const app = express();

app.listen(3000, function(req, res){
  console.log(`Server started at 3000`);
})