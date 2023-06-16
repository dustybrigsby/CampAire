$(document).ready(function() {
  
  // Global variables
  var zipInput = $(".zip-input");
  var map;
  var googleMapId = "3ee7328d82b483e6";
  var locationAPI = ('pk.89ed628237a7d3a065d576b871965ac0');
  var iQAirAPI = ('3ac59854-8742-4b4c-b4f1-4ea76e8f0301');

  // function to get local storage & render last 3-4 zipcodes

  // Get coordinates for the user-inputted Zipcode
  function getCoordinates(zip) {
    var coordinatesURL = "https://us1.locationiq.com/v1/search?key=" + locationAPI + "&country=USA&postalcode=" + zip + "&format=json";
    
  
    fetch(coordinatesURL) 
    .then(function(response){
        
        if(response.ok) {
            response.json().then (function(data){
                
                var Latitude = data[0].lat;
                var Longitude = data[0].lon;
                //getCampgrounds(Latitude, Longitude);
                getAirQuality(Latitude, Longitude);
            })
        }
    });
  }


  // Get the air quality of the Zipcode's coordinates
  function getAirQuality(lat, lon) {
    var  airQualityUrl = "http://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + lon + "&key=" + iQAirAPI;
    
    fetch(airQualityUrl)
    .then(function (response) {
        
        if(response.ok) {
            response.json().then(function (data) {
              console.log(data)
                var aqi = data.data.current.pollution.aqius;
                var city = data.data.city;
                var state = data.data.state;
                
                
                displayResults(aqi, city, state);
                
            })
        }
    });
  }

  function displayResults(aqi, city, state) {
    var displayAQI = $('#current-aqi');

    if (0 < aqi < 50) {
        displayAQI.text("Your Air quality is " + aqi +" in " + city + ", " + state);
    } else if (50 <= aqi > 100) {
        displayAQI.text("Your Air quality is " + aqi + " in " + city + ", " + state);
    }
    return;
  }

  function searchZipcode(event) {
    event.preventDefault();
    var input = $(this).closest('.search-form').find('.zip-input');
    var zip = input.val();

    if (zip) {
        getCoordinates(zip);
    }

    // Clear input field
    input.val('');
  }

    // TODO: function to save inputted zipcode to local storage
    // If user has nothing in local storage, show entry screen + hide results.
    // If user has something in local storage, hide entry screen + show results.


  // if (airQuality is Good || Fair || Moderate) {
  //   then we run get campgrounds from Google maps
  // } else if (airQuality is Poor or Very Poor {
  //   then we display a message to not go camping
  // })


  // function to fetch info from Google Maps api for nearby Campgrounds from a given zip code
  async function getCampgrounds(lat, lng) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary(
      "marker"
    );
    const { PlacesService } = await google.maps.importLibrary("places");
    const coordinates = new google.maps.LatLng(lat, lng);

    // The map, centered at searched zip
    map = new Map(document.getElementById("map"), {
      zoom: 10,
      center: coordinates,
      mapId: googleMapId,
    });

    // The marker, positioned at entered zip
    const marker = new AdvancedMarkerElement({
      map: map,
      position: coordinates,
      title: zip.toString(),
    });
  }

  // Sets initial map
  async function initMap(lat, lng) {
    console.log("Lat: " + lat + ", Lng: " + lng);

    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary(
      "marker"
    );
    const coordinates = new google.maps.LatLng(lat, lng);

    // The map, centered on Portland
    map = new Map(document.getElementById("map"), {
      zoom: 10,
      center: coordinates,
      mapId: googleMapId,
    });

    // The marker, positioned at Portland
    const marker = new AdvancedMarkerElement({
      map: map,
      position: coordinates,
      title: "Portland, OR",
    });
  }


  // Search button Event Listener
  $("#search-btn-1").on("click", searchZipcode);
  $("#search-btn-2").on("click", searchZipcode);
  initMap(45.5152, -122.6784);

});