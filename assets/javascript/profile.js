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
      dbCreateUser(userName, firstName, lastName, password, email, address, city, state, zipCode);
      window.location.replace('./index.html');
  });