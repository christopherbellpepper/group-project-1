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
var dbUserBucketList = null;

dbIsConnected.on("value", function(snap) {
     if (snap.val()) {
         dbConnectionObject = dbRefUsersList.push("temp-name");
         dbConnectionObject.onDisconnect().remove();
     }
});

var dbRefBucketList = null;

function dbCheckLogin(username,password) {
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
                    console.log("snapval",snap);
                    dbUserBucketList = snap.val();
                    console.log("dbCheckLogin bucket list",dbUserBucketList);
                    displayMyList();
                });
                loginSuccess();
                return;
            }
            else {
                // Password doesn't match.
                loginFailed();
            }
        }
        else {
            // No such user.
            loginFailed();
        }
    });
}

function dbCreateUser(username, firstName, lastName, password, email, address, city, state, zipCode) {
    console.log("dbCreateUser");

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
        console.log("snapval",snap);
        dbUserBucketList = snap.val();
        console.log("dbCreateUser bucket list");
        displayMyList();
    });

    var firstWish = {"wish" : "Create a Bucket List",
                     "priority": "1",
                     "notes" : "Fill me out before it's too late!!"};
    dbRefBucketList.set(firstWish);



    loginSuccess();
    return;
}

function dbWriteFullList(listObject) {
    dbRefBucketList.set(listObject);
}

function displayMyList()
{
    console.log("displayMyList",dbUserBucketList);
    console.log("list length",dbUserBucketList.length);
    $listSection = $("#bucket-list-table");
    $listSection.empty();

    for (var i=0; i < dbUserBucketList.length; i++) {
        console.log(dbUserBucketList[i]);
    }
    // // append to our sidebar table 
    // ).append(
    //     "<tr><th>" + snapshot.val().newListItem + "</th>" 
    //     // + "<td>" + snapshot.val().newItemNotes + "</td>"
    //     );
  
    //     // append to our list on the "mylist page" 
    //     $("#list-data-table").append(
    //     "<tr><th>" + snapshot.val().newListItem + "</th>" 
    //     + "<td>" + snapshot.val().newItemNotes + "</td>"
    //     );
        
    //     // Clear the textbox when done
    //     $(".form-control").val("");
}