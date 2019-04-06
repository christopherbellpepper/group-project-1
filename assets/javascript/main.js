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
  modelDiv = $("#usernotify-modal");
  $("#usernotify-message").text(msg);
  modelDiv.css("display","block");
}

$("#usernotify-button").on("click",function(event) {
  modelDiv.css("display","none");
});


  ///////////////      Account Info     ///////////////
    // User Info Variables //
    var firstName = "";
    var lastName = "";
    var userName = "";
    var password = "";
    var email = "";
    var address = "";
    var city = "";
    var state = "";
    var zipCode = "";

    

       // Initial Variables 
     var newListItem = "";
     var newItemNotes = "";  

    // Click Button changes what is stored in firebase
      $("#click-button").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();

      // Get inputs
      newListItem = $("#item-input").val().trim();
      newItemNotes = $("#notes-input").val().trim();

      // Change what is saved in firebase
      var newList = dbUserBucketList;
      var newItem = {"wish" : newListItem,
                     "priority": "5",
                    "notes" : newItemNotes};

      newList.push(newItem);
      dbWriteFullList(newList);
    });

    //getCurrentLocation();