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




// Enquiry
const uname = document.getElementById("name");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const ulocation = document.getElementById("location");
const subject = document.getElementById("subject");
const body = document.getElementById("body");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    if (uname.value != '' && email.value != '' && contact.value != '' && ulocation.value != '' && subject.value != '' && body.value != '')
        sendToServer();
    else
        alert("Please fill all the details!");
});

function sendToServer() {
    var request = new XMLHttpRequest();
    request.open("POST", "/enquiry");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json");

    const data = {};
    data.name = uname.value;
    data.email = email.value;
    data.contact = contact.value;
    data.location = ulocation.value;
    data.subject = subject.value;
    data.body = body.value;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    request.send(blob);

    request.addEventListener("load", () => {
        alert("We recieved your query, Our team will contact you soon. THANK YOU :-)");
        location.reload();
    });
}