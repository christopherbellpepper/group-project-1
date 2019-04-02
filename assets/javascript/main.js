$(document).ready(function(){
    $("#login-form").show();
    $("#input-data").hide();
    $("#main-data-table").hide();
    autoLogin();
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD0xosfRSv6pYvR5Vg_VNMtCkuIG6m-vZw",
    authDomain: "classtest-425b2.firebaseapp.com",
    databaseURL: "https://classtest-425b2.firebaseio.com",
    projectId: "classtest-425b2",
    storageBucket: "classtest-425b2.appspot.com",
    messagingSenderId: "80198329263"
  };
  firebase.initializeApp(config);

  //   // Create a variable to reference the database
    var database = firebase.database();

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
      database.ref().set({
        newListItem: newListItem,
        newItemNotes: newItemNotes,
      });
    });

    // Firebase 
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {

      // append to our sidebar table 
      $("#bucket-list-table").append(
      "<tr><th>" + snapshot.val().newListItem + "</th>" 
      // + "<td>" + snapshot.val().newItemNotes + "</td>"
      );

      // append to our list on the "mylist page" 
      $("#list-data-table").append(
      "<tr><th>" + snapshot.val().newListItem + "</th>" 
      + "<td>" + snapshot.val().newItemNotes + "</td>"
      );
      
      // Clear the textbox when done
      $(".form-control").val("");
    });


