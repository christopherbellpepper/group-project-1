// Contains the javascript specific (or mostly) to the login screen.

$("#login-button").on("click",function(event) {
    event.preventDefault();
    var username = $("#login-form-username").val();
    if (!username) {
        return;
    }
    var password = $("#login-form-password").val();
    if (!password) {
        return;
    }

    var remember = $("#login-form-remember")[0].checked;

    if (remember == true) {
        localStorage.setItem("name",username);
        localStorage.setItem("code",password);
    } 
    else {
        localStorage.setItem("name","");
        localStorage.setItem("code","");
    }
    tryLogin(username,password);
});

function autoLogin() {
    var rememberedUser=localStorage.getItem("name");
    var rememberedPass=localStorage.getItem("code");
    if (rememberedUser && rememberedPass) {
        tryLogin(rememberedUser,rememberedPass);
    }
}

function tryLogin(username, password) {
    // Read the password for the username from the database.
    //var dbPassword = dbReadUserPassword(username);
    dbPassword = password;
    if (dbPassword === password) {
    $("#login-form").hide();
    $("#input-data").show();
    $("#main-data-table").show();
    }
    dbUserName = username;
}