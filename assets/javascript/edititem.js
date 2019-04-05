var googleApiKey="AIzaSyAlppE1f4yIN3TW5Rwo7x_c7qAOBSmuFy0"

//https://www.w3schools.com/graphics/google_maps_basic.asp
function displayItemMap(coord) {
    if (!coord) {
      coord = {};
      coord.lat = -22.9068;
      coord.lng = -43.1729;
    }
  
    var mapProp= {
      center:new google.maps.LatLng(coord.lat,coord.lng),
      zoom:5,
    };
  
    var mapSection = document.getElementById("map-display");
    var map = new google.maps.Map(mapSection,mapProp);
}

function mapItem(geocodeObject) {
    if (geocodeObject.status != "OK") {
        console.log("Can't get geocode of location ",geocodeObject);
        return;
    }
    displayItemMap(geocodeObject.results[0].geometry.location);
}

// Makes the asynchronous call to get the latitude/longitude of the specified address/location
function setMap(location) {
    var apiRootURL="https://maps.googleapis.com/maps/api/geocode/json?";
    var apiQueryUrl=encodeURI(`${apiRootURL}address=${location}&key=${googleApiKey}`);

    $.ajax({
        url: apiQueryUrl,
        method: "GET"
      }).then(mapItem); 
}

$("#item-location").on("change", function(event) {
    console.log("Item Location Field changed",event);
    console.log("New Value",$("#item-location").val());
    setMap($("#item-location").val());
});