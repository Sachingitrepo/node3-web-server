const request = require("request");

const geoCode = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1Ijoic2FjaGlucnIxNDciLCJhIjoiY2s5NzRwOWpvMGwxejNncGNwYjI0aTBxbyJ9.8T0fKgziY1QZFQTannMf5g";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the service", undefined);
    } else if (body.features.length === 0) {
      callback("Some issue reagrding location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitutde: body.features[0].center[0],
        place: body.features[0].context[0].text,
      });
    }
  });
};

module.exports = geoCode;
