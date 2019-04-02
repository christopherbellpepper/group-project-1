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

dbIsConnected.on("value", function(snap) {
     if (snap.val()) {
         dbConnectionObject = dbRefUsersList.push("temp-name");
         dbConnectionObject.onDisconnect().remove();
     }
});

var dbRefProfileInfo = null;
var dbRefBucketList = null;

function dbReadUserPassword(username) {
    database.ref("/users/"+username+"/profile").once("value",function(snap) {
        if (snap.val()) {
            return snap.val()["password"];
        }
        return "";
    });
}

function dbCreateProfile(username, profileObject) {
    database.ref("/users/"+username+"/profile").set(profileObject);
}

function dbSetupUserConnections(username) {
    dbConnectionObject.set(username);
    dbRefProfileInfo = database.ref("/users/"+username+"/profile");
    dbRefBucketList = database.ref("/users/"+username+"/list");
}