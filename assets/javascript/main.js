$(document).ready(function(){
    $("#login-form").show();
    $("#input-data").hide();
    $("#main-data-table").hide();
    autoLogin();
  });

function isEmptyOrSpaces(str){
  return str === null || str.match(/^ *$/) !== null;
}

function showInfoMessage(msg) {
  $("#usernotify-message").text(msg);
  modelDiv = $("#usernotify-modal");
  modelDiv.css("display","block");
}

$("#add-item-btn").on("click",function(event) {
  editItem(-1);
});

$("#usernotify-button").on("click",function(event) {
  modelDiv.css("display","none");
});

$("#bucket-list-table").on("mouseenter",".wish-item-name",function(event) {
  this.style.background = "lightgreen";
});

$("#bucket-list-table").on("mouseleave",".wish-item-name",function() {
  this.style.background = "none";
});

$("#bucket-list-table").on("click",".wish-item-name",function() {
  populateItemDataView(parseInt(this.getAttribute("wish-item-index")));
});

$("#bucket-list-table").on("click","button",function() {
  if (this.hasAttribute("data-subtract")) {
    deleteItem(parseInt(this.getAttribute("data-subtract")));
  }
  else if (this.hasAttribute("data-edit")) {
    editItem(parseInt(this.getAttribute("data-edit")));
  }
});

function displayMainMap(coord) {
  if (!coord) {
    coord = {};
    coord.lat = -22.9068;
    coord.lng = -43.1729;
  }

  var mapProp= {
    center:new google.maps.LatLng(coord.lat,coord.lng),
    zoom:5,
  };

  var mapSection = document.getElementById("item-data-location-map");
  var map = new google.maps.Map(mapSection,mapProp);
}

function populateItemDataView(itemIndex) {
  var itemInfo = dbUserBucketList[itemIndex];

  if (itemInfo.wish) {
    $("#item-data-name").text(itemInfo.wish);
  }
  else {
    $("#item-data-name").text("");
  }

  if (itemInfo.notes) {
    $("#item-data-description").text(itemInfo.notes);
  }
  else {
    $("#item-data-description").text("");
  }

  if (itemInfo.location) {
    $("#item-data-location-name").text(itemInfo.location);
  }
  else {
    $("#item-data-location-name").text("");
  }

  if (itemInfo.coords) {
     displayMainMap(itemInfo.coords);    
  }
}

getCurrentLocation();