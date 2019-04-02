$(document).ready(function(){
    $("#login-form").show();
    $("#input-data").hide();
    $("#main-data-table").hide();
    autoLogin();
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


