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
                dbUserInfo = {"name" : userInfo.username, 
                              "email" : userInfo.email,
                              "home" : userInfo.home};
                dbRefBucketList = database.ref("/users/"+username+"/bucket");
                loginSuccess();
                return;
            }
        }
    });
    loginFailed();
}

function dbCreateUser(username, firstName, lastName, password, email, homeLocation) {
    database.ref("/users/"+username).set(" ");
    database.ref("/users/"+username+"/password").set(password);
    database.ref("/users/"+username+"/email").set(email);
    database.ref("/users/"+username+"/home").set(homeLocation);
    database.ref("/users/"+username+"/first-name").set(firstName);
    dataabase.ref("/users/"+username+"/last-name").set(lastName);
}

function dbWriteFullList(listObject) {
    dbRefBucketList.set(listObject);
}

dbRefBucketList.on("value",function(snap) {
    dbUserBucketList = snap.val();
});