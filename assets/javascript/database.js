// Initialize Firebase
var config = {
    apiKey: "AIzaSyCRLJCHHqL9S_6swZC3mFVktmygWSxeP20",
    authDomain: "bucket-list-test-b5799.firebaseapp.com",
    databaseURL: "https://bucket-list-test-b5799.firebaseio.com",
    projectId: "bucket-list-test-b5799",
    storageBucket: "bucket-list-test-b5799.appspot.com",
    messagingSenderId: "950186374119"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Maintain a list of users that are logged in.
var dbIsConnected = database.ref(".info/connected");
var dbRefUsersList = database.ref("/active-users");
var dbConnectionObject = null;
var dbUserInfo = null;
var dbUserBucketList = [];

dbIsConnected.on("value", function(snap) {
     if (snap.val()) {
         dbConnectionObject = dbRefUsersList.push("temp-name");
         dbConnectionObject.onDisconnect().remove();
     }
});

var dbRefBucketList = null;

function dbCheckLogin(username,password) {
    console.log("dbCheckLogin", username + " " + password);
    database.ref("/users/"+username).once("value",function(snap) {
        if (snap.val()) {
            var userInfo = snap.val();
            if (userInfo["password"] === password) {
                dbConnectionObject.set(username);
                dbUserInfo = {"userName" : username, 
                              "email" : userInfo.email,
                              "home" : userInfo.home,
                              "firstName" : userInfo.firstName,
                              "lastName" : userInfo.lastName,
                              "address" : userInfo.address,
                              "city" : userInfo.city,
                              "state" : userInfo.state,
                              "zipCode" : userInfo.zipCode};
                dbRefBucketList = database.ref("/users/"+username+"/bucket");

                dbRefBucketList.on("value",function(snap) {
                    if (snap.val()) {                    
                        dbUserBucketList = snap.val();
                        displayMyList();
                    }
                });
                loginSuccess();
                return;
            }
            else {
                // Password doesn't match.
                showInfoMessage("Password incorrect");
                loginFailed();
            }
        }
        else {
            // No such user.
            showInfoMessage("No such user");
            loginFailed();
        }
    });
}

function dbCreateUser(username, firstName, lastName, password, email, address, city, state, zipCode) {
    // ToDO: prevent someone from creating a user that already exist.

    //database.ref("/users/"+username).set(" ");
    database.ref("/users/"+username+"/password").set(password);
    database.ref("/users/"+username+"/email").set(email);
    database.ref("/users/"+username+"/firstName").set(firstName);
    database.ref("/users/"+username+"/lastName").set(lastName);
    database.ref("/users/"+username+"/address").set(address);
    database.ref("/users/"+username+"/city").set(city);
    database.ref("/users/"+username+"/state").set(state);
    database.ref("/users/"+username+"/zipCode").set(zipCode);

    dbRefBucketList = database.ref("/users/"+username+"/bucket");

    dbRefBucketList.on("value",function(snap) {
         dbUserBucketList = snap.val();
         displayMyList();
    });

    var wishArray = [];
    wishArray[0] = {"wish" : "Create a Bucket List",
                     "priority": "1",
                     "notes" : "Fill me out before it's too late!!",
                     "location" : "Current",
                     "coords" : getStoredCoordinates("current-location")};
    dbRefBucketList.set(wishArray);
    loginSuccess();
    return;
}

function dbWriteFullList(listObject) {
    dbRefBucketList.set(listObject);
}

function deleteItem(index) {
    if (!dbUserBucketList) {
        return;
    }

    if (index < 0 || index >= dbUserBucketList) {
        return;
    }

    var newArray = dbUserBucketList;    
    newArray.splice(index,1);
    dbWriteFullList(newArray);
}

function displayMyList()
{
    if (!dbUserBucketList) {
        dbUserBucketList = [];
    }
    
    listSection = $("#bucket-list-table");
    listSection.empty();

    for (var i=0; i < dbUserBucketList.length; i++) {
        var newListRow = $("<tr>");

        // First column of every row will be a set of buttons.
        var newListColumn = $("<td>");
        var newButtonDiv = $("<div>");

        var cancelButton = $("<button>");
        cancelButton.addClass('listButton');
        cancelButton.text('✓');
        cancelButton.attr("data-subtract",i)
        newButtonDiv.append(cancelButton);
        var editButton = $('<button>');
        editButton.addClass('listButton');
        editButton.text('e');
        newButtonDiv.append(editButton);
        editButton.attr("data-edit",i)
        newListColumn.append(newButtonDiv);
        newListRow.append(newListColumn);

        // Second column of the row will be the wish (title).
        newListColumn = $("<td>");
        newListColumn.addClass("wish-item-name");
        newListColumn.attr("wish-item-index",i);
        newListColumn.text(dbUserBucketList[i].wish);
        newListRow.append(newListColumn);
        listSection.append(newListRow);
    }
}