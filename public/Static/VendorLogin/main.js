const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    if (email.value == '' || password.value == '')
        alert("please fill all the details");
    else {
        userData = {};
        userData.email = email.value;
        userData.password = password.value;
        sendRequestToServer(userData);
    }
});


function sendRequestToServer(user) {
    var request = new XMLHttpRequest();
    request.open("POST", "/vendorLogin");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json");
    const blob = new Blob([JSON.stringify(user, null, 2)], { type: 'application/json' });
    request.send(blob);

    var data;
    request.addEventListener("load", () => {
        data = request.responseText;
        data = JSON.parse(data);
        if (data.user_found) {
            console.log("user found " + data.name);
            alert("Welcome " + data.name);
            location.replace("http://localhost:3000/index.html");
        } else {
            console.log("no user found!!!");
            alert("Either email or password did not match");
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    console.log("dom loaded");
});