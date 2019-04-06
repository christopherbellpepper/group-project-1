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

    $("#map-lat").text(coord.lat);
    $("#map-lng").text(coord.lng);
  
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

function editItem(itemIndex) {
  $("#edit-div").css("display","block");

  if (itemIndex < 0 || itemIndex >= dbUserBucketList.length) {
    var itemInfo = {};
    $("#item-index").text("-1");
  }
  else {
    var itemInfo = dbUserBucketList[itemIndex];
    $("#item-index").text(itemIndex);
  }

  if (itemInfo.wish) {
    $("#item-input").val(itemInfo.wish);
  }
  else {
    $("#item-input").val("");
  }

  if (itemInfo.notes) {
    $("#item-description").val(itemInfo.notes);
  }
  else {
    $("#item-description").val("");
  }

  if (itemInfo.coords) {
    displayItemMap(itemInfo.coords);
  }

  if (itemInfo.location) {
    $("#item-location").val(itemInfo.location);
  }
  else {
    $("#item-location").val("");
  }
}

// When the user changes the value on the field 
$("#item-location").on("change", function(event) {
  setMap($("#item-location").val());
});

// Handle when the user clicks 'cancel' on the edit modal
$("#add-item-cancel").on("click", function(event) {
  $("#edit-div").css("display","none");
});

// Handle when the user clicks 'save' on the edit modal
$("#add-item-save").on("click", function(event) {
  var storedItemIndex = $("#item-index").text();

  if (isEmptyOrSpaces(storedItemIndex)) {
    var itemIndex = dbUserBucketList.length;
  }
  else {
    var itemIndex = parseInt(storedItemIndex);
    if (itemIndex < 0 || itemIndex >= dbUserBucketList.length) {
      itemIndex = dbUserBucketList.length;
    }
  }

  var itemName = $("#item-input").val();
  if (isEmptyOrSpaces(itemName)) {
    // Model message box.
    showInfoMessage("Cannot save, no item name given.");
    return
  }
  var description = $("#item-description").val();
  if (isEmptyOrSpaces(description)) {
    // Model message box.
    showInfoMessage("Cannot save, no description given.");
    return
  }

  var location =  $("#item-location").val();
  var coords = {"lat": $("#map-lat").text(),
                "lng": $("#map-lng").text()};

  var wishItem = {"wish" : itemName,
                  "priority": "1",
                  "notes" : description,
                  "location" : location,
                  "coords" : coords};

  var newList = dbUserBucketList;

  if (itemIndex >= newList.length) {
    newList.push(wishItem);
  }
  else {
    newList[itemIndex] = wishItem;
  }

  dbWriteFullList(newList);
  $("#edit-div").css("display","none");
});