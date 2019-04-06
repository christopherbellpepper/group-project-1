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
  console.log("showInfoMessage",msg);  
  $("#usernotify-message").text(msg);
  modelDiv = $("#usernotify-modal");
  modelDiv.css("display","block");
}

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

$("#bucket-list-table").on("click","btn",function() {
  console.log("click button",this.getAttribute("wish-item-index"));
});

function populateItemDataView(index) {
  
}