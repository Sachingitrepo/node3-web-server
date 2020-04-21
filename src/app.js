const path = require("path");
const express = require("express");
const geoCode = require("./util/geocode");
const forecast = require("./util/forecast");
const publicDirectoryPath = path.join(__dirname, "../public");
const app = express();

app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//   res.send("<h1>hello express</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send("help section");
// });

// app.get("/about", (req, res) => {
//   res.send("About section");
// });

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.location) {
    return res.send({
      error: "Kindly provide the location!",
    });
  }

  geoCode(req.query.location, (error, { latitude, longitutde, place } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitutde, (error, { desc, temp } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        desc,
        temp,
        place,
      });
    });
  });
});

app.listen(3000, () => {
  console.log("application is listing on 3000 port!");
});
