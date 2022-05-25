const uname = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeat-password");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    if (uname.value == '' || phone.value == '' || email.value == '' || password.value == '' || repeatPassword.value == '')
        alert("please fill all the details");
    else if (password.value != repeatPassword.value) {
        repeatPassword.value = '';
        console.log("pwd!=rpwd");
        alert("password does not match repeat password!!!");
    } else {
        userData = {};
        userData.name = uname.value;
        userData.phone = phone.value;
        userData.email = email.value;
        userData.password = password.value;
        //console.log(userData);
        sendRequestToServer(userData);
    }
});

function sendRequestToServer(user) {
    var request = new XMLHttpRequest();
    request.open("POST", "/vendorSignup");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json");
    const blob = new Blob([JSON.stringify(user, null, 2)], { type: 'application/json' });
    request.send(blob);

    let data;
    request.addEventListener("load", () => {
        data = request.responseText;
        data = JSON.parse(data);
        console.log(data);
        if (data.user_exist) {
            alert("User Already exist with same email id!!!");
        } else {
            alert("Registered Successfully");
            window.history.back();
        }
    });
}