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
            console.log("user is logged in already Welcome", data.name);
            userStatus(data);
        }
    })
}
checkUserLog();


const logout = document.getElementById("logout");

function userStatus(user) {
    console.log(user);
    var log = document.getElementsByClassName("fa-sign-in");
    log = log[0].parentNode.parentNode;
    var sign = document.getElementsByClassName("fa-user-plus");
    sign = sign[0].parentNode.parentNode;
    const loggedUser = document.getElementById("loggedUser");
    if (user.name === null) {
        console.log("no user");
        log.style.display = "block";
        sign.style.display = "block";
        loggedUser.style.display = "none";
    } else {
        console.log("user found:", user.name);
        if (user.userType == "Visitor") {
            log.style.display = "none";
            sign.style.display = "none";
            const userName = document.getElementById("userName");
            const icon = '<i class="fa fa-caret-down" aria-hidden="true"></i>';
            loggedUser.style.display = "block";
            userName.innerHTML = user.name + " " + icon;
        } else {
            log.style.display = "none";
            sign.style.display = "none";
            const userName = document.getElementById("userName");
            const icon = '<i class="fa fa-caret-down" aria-hidden="true"></i>';
            loggedUser.style.display = "block";
            userName.innerHTML = user.name + " " + icon;

            //create request option or vendors
            {
                var t = document.createElement("a");
                t.setAttribute("class", "dropdown-item");
                t.setAttribute("href", "./Static/VendorPage/index.html");
                t.innerHTML = "Requests";
                var p = document.createElement("li");
                p.appendChild(t);
                logout.parentNode.appendChild(p);
            }
        }
    }
}
//checking user is logged in or not end


//User logging out
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