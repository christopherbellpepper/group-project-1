var locations ={};
var travelMatrix = {};
var googleApiKey="";
var bingApiKey="";

// Handles the return from the geolocation API.
function receiveLocation(tag,position) {
    var coordObject = {};
    coordObject.lat = position.coords.latitude;
    coordObject.lng = position.coords.longitude;
    locations[tag] = coordObject;
}

// Makes the asynchronous call to get the user's current location.
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(receiveLocation.bind(this,"current-location"));
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// Recieves the reply from the geocode API and adds the address into the locations
// dictionary.
function receiveGeocode(tag,geocodeObject) {
    if (geocodeObject.status != "OK") {
        console.log("Can't get geocode of location " + tag ,geocodeObject.status);
    }

    locations[tag] = geocodeObject.results[0].geometry.location;
}

// Makes the asynchronous call to get the latitude/longitude of the specified address/location
function getGeocodeOfLocation(tag,location) {
    var apiRootURL="https://maps.googleapis.com/maps/api/geocode/json?";
    var apiQueryUrl=encodeURI(`${apiRootURL}address=${location}&key=${googleApiKey}`);
    $.ajax({
        url: apiQueryUrl,
        method: "GET"
      }).then(receiveGeocode.bind(this,tag)); 
}

// Process the response from the travel matrix API query.  Adds it to the
// 'travelMatrix' variable using the given tag.
function processDistanceMatrixResult(tag,apiResultData) {
    var travelObject = {};
    travelObject.travelType="driving";
    travelObject.travelDistance = apiResultData.resourceSets[0].resources[0].results[0].travelDistance;
    travelObject.travelDuration = apiResultData.resourceSets[0].resources[0].results[0].travelDuration;
    travelMatrix[tag] = travelObject;
}

// Requests a travel matrix from one location to another.  (coords).
// https://developers.google.com/api-client-library/javascript/features/cors
// https://docs.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-distance-matrix
function requestDistanceMatrixByCoords(tag, start, destination) {
    var apiRootURL= "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?";
    var apiQueryUrl=`${apiRootURL}origins=${start.lat},${start.lng}`+
                    `&destinations=${destination.lat},${destination.lng}`+
                    `&travelMode=driving&key=${bingApiKey}`;
        
    apiQueryUrl=encodeURI(apiQueryUrl);

    $.ajax({
        url: apiQueryUrl,
        method: "GET"
      }).then(processDistanceMatrixResult.bind(this,tag));    
}


// Get a stored coordinate by it's tag value.
function getStoredCoordinates(tag) {
    var keys = Object.keys(locations);
    if (keys.includes(tag)) {
        return locations[tag];
    }
}