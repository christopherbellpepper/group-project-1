$(document).ready(function(){
    $("#login-form").show();
    $("#input-data").hide();
    $("#main-data-table").hide();
    autoLogin();
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

    // Click Button changes what is stored in firebase
    $("#create-account-button").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();
    
        // Get inputs
        firstName = $("#inputFirstName").val().trim();
        lastName = $("#inputLastName").val().trim();
        userName = $("#inputUserName").val().trim();
        password = $("#inputPassword").val().trim();
        email = $("#inputEmail").val().trim();
        address = $("#inputAddress").val().trim();
        city = $("#inputCity").val().trim();
        state = $("#inputState").val();
        zipCode = $("#inputZip").val().trim();
    
        // Change what is saved in firebase
          database.ref().set({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            email: email,
            address: address,
            city: city,
            state: state,
            zipCode: zipCode
          });
    });

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


