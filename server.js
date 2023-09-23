const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("./data/database");


const port = 3000;
app.use(bodyParser.json());
app.use("/", require("./routes"));

mongodb.initDb((err, db) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(process.env.PORT || port, () => {
      console.log("Web Server is listening at port " + (process.env.PORT || port));
    });
}});


