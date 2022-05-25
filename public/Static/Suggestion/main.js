//checking user is logged in or not
function checkUserLog() {
    var request = new XMLHttpRequest();
    request.open("GET", "/userLog");
    request.send();
    var data;
    request.addEventListener("load", () => {
        data = request.responseText;
        data = JSON.parse(data);
        if (data.name === null) {
            console.log("User is not logged in!");
            userStatus(null);
        } else {
            console.log("user is logged in already " + "Welcome", data.name);
            userStatus(data.name);
        }
    })
}
checkUserLog();


function userStatus(user) {
    console.log(user);
    var log = document.getElementsByClassName("fa-sign-in");
    log = log[0].parentNode.parentNode;
    var sign = document.getElementsByClassName("fa-user-plus");
    sign = sign[0].parentNode.parentNode;
    const loggedUser = document.getElementById("loggedUser");
    if (user === null) {
        console.log("no user");
        log.style.display = "block";
        sign.style.display = "block";
        loggedUser.style.display = "none";
    } else {
        console.log("user found:", user);
        log.style.display = "none";
        sign.style.display = "none";
        const userName = document.getElementById("userName");
        const icon = '<i class="fa fa-caret-down" aria-hidden="true"></i>';
        loggedUser.style.display = "block";
        userName.innerHTML = user + " " + icon;
    }
}
//checking user is logged in or not end


//User logging out
const logout = document.getElementById("logout");
logout.addEventListener("click", logoutUser);

function logoutUser() {
    var request = new XMLHttpRequest();
    request.open("POST", "/logoutUser");
    request.send();
    request.addEventListener("load", () => {
        alert("You are logged out now!");
        location.reload();
    });
}



const uname = document.getElementById("name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    if (uname.value == '' || email.value == '' || age.value == '' || phone.value == '' || message.value == '')
        alert("please fill all the details");
    else if (age.value <= 0)
        alert("Age cannot be less than or equals to zero!!!");
    else
        sendToServer();
});


function sendToServer() {
    var request = new XMLHttpRequest();
    request.open("POST", "/suggestion");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json");

    const data = {};
    data.name = uname.value;
    data.email = email.value;
    data.age = age.value;
    data.phone = phone.value;
    data.message = message.value;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    request.send(blob);

    request.addEventListener("load", () => {
        alert("THANK YOU for your suggestion, we will look into this. :-)");
        location.reload();
    });
}