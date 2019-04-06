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

    //getCurrentLocation();