// Global variables
var zipInput = $("#zip-input");
var googleApiKey = "AIzaSyBbUsG9h8clR86p6Hqs5QtjViuXYG3eE04";

// function to get local storageg and render last zipcode

// Get coordinates for the user-inputted Zipcode
function getCoords(zip) {
  var coordsURL =
    "http://api.openweathermap.org/geo/1.0/zip?zip=" +
    zip +
    "&appid=1cca1ff3113de5f3c3d237f233f7da56";

  fetch(coordsURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data.lat, data.lon);
        getAirQuality(data.lat, data.lon);
      });
    }
  });
}

var zip = "97209";
var requestURL =
  "http://api.openweathermap.org/data/2.5/air_pollution?q=" +
  zip +
  "&appid=1cca1ff3113de5f3c3d237f233f7da56";

fetch(requestURL).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log("response is coming back ok");
      console.log(data);
    });
  } else {
    alert("Error: " + response.statusText);
  }
});

// if (airQuality is Good || Fair || Moderate) {
//   then we run get campgrounds from Google maps
// } else if (airQuality is Poor or Very Poor {
//   then we display a message to not go camping
// })

// Gets coordinates from zip code
function getCoords(zip) {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode(
    { address: zip, key: googleApiKey },
    function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();

        console.log("latitude: " + latitude);
        console.log("longitude: " + longitude);
      } else {
        console.log(
          "Geocoding zip code to coordinates failed due to: " + status
        );
      }
    }
  );
}

// function get campgrounds from Google maps
function getCampgrounds() {
  var latitude = "";
  var longitude = "";
  var radius = "";
  var mapsUrl =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
    latitude +
    "%2C" +
    longitude +
    "&radius=" +
    radius +
    "&type=campground&rankby=distance&key=" +
    googleApiKey;

  fetch(mapsUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log("Google Maps response is coming back OK");
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}
