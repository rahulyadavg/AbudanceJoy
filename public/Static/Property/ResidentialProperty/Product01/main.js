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


const product_name = "Two Room Set in Delhi, Shahpur Jat";
const product_id = 3;
const login = document.getElementById("login");
const view_price = document.getElementById("view_price");
let price = 7000;


view_price.addEventListener("click", () => {
    view_price.innerHTML = "rs" + price + "/pm";
});


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
            orderRequest();
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

function orderRequest() {
    login.innerHTML = "Send Request";
    login.addEventListener("click", sendOrder);
}

function sendOrder() {
    alert("Order has been placed with your respective email id and mobile number, You will be contacted soon!");
    console.log("yo send");
    login.href = "#";
    let req_data = {};
    req_data.product_name = product_name;
    req_data.product_id = product_id;
    req_data.price = price;
    sendRequestToServer(req_data);
}

function sendRequestToServer(req_data) {
    var request = new XMLHttpRequest();
    request.open("POST", "/sendRequest");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json");
    const blob = new Blob([JSON.stringify(req_data, null, 2)], { type: 'application/json' });
    request.send(blob);

    var data;
    request.addEventListener("load", () => {
        console.log(data);
        data = request.responseText;
        //data = JSON.parse(data);
        if (data) {
            console.log("request sent");
            alert("Order has been placed with your respective email id and mobile number, You will be");
        } else {
            alert("Something went wrong!!!");
        }
    });
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