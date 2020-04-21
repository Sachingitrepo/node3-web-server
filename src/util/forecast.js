const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9db69d550d86ecc4484fc918d55d1efa&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the service", undefined);
    } else if (body.error) {
      callback("Some issue reagrding location", undefined);
    } else {
      callback(undefined, {
        desc: body.current.weather_descriptions[0],
        temp: body.current.temperature,
      });
    }
  });
};

module.exports = forecast;
