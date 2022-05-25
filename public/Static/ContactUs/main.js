//const { response } = require("express");

function init() {
    var readMoreBtn = document.getElementById("readMore");
    var flag = 0;
    readMoreBtn.addEventListener("click", function() {
        var readMore = document.getElementById("demo_homepage");
        if (!flag) {
            readMore.style.display = "block";
            readMoreBtn.innerHTML = 'Read Less <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>';
            flag = 1;
        } else {
            readMore.style.display = "none";
            readMoreBtn.innerHTML = 'Read More <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>';
            flag = 0;
        }
    });
}

init();

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




// Contact Us
const namecc = document.getElementById("namecc");
const emailcc = document.getElementById("emailcc");
const contactcc = document.getElementById("contactcc");
const commentcc = document.getElementById("commentcc");
const savecc = document.getElementById("savecc");

savecc.addEventListener("click", () => {
    if (namecc.value != '' && emailcc.value != '' && contactcc.value != '' && commentcc.value != '')
        sendToServer();
});

function sendToServer() {
    var request = new XMLHttpRequest();
    request.open("POST", "/contactUs");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json");

    const data = {};
    data.name = namecc.value;
    data.email = emailcc.value;
    data.contact = contactcc.value;
    data.comment = commentcc.value;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    request.send(blob);

    let res;
    request.addEventListener("load", () => {
        res = request.responseText;
        res = JSON.parse(res);
        alert("We recieved your request, Our team will contact you soon. THANK YOU :-)");
    });
}