const path = require("path");
const express = require("express");
const geoCode = require("./util/geocode");
const forecast = require("./util/forecast");
const publicDirectoryPath = path.join(__dirname, "../public");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
  console.log("application is listing on 3000 port!" + port);
});
