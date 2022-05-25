//const { LATIN7_ESTONIAN_CS } = require("mysql/lib/protocol/constants/charsets");

function readMoreButton() {
    var readMoreBtn = document.getElementById("readMore");
    var flag = 0;
    readMoreBtn.addEventListener("click", function() {
        console.log("ShowMore Clicked!!!");
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

readMoreButton(); //showMore Button function


//filter management
let products = {
    1: {
        "category": "Property",
        "sub_category": ["ResidentialProperty", "CommercialProperty"]
    },
    2: {
        "category": "Electronics",
        "sub_category": ["Airconditioner", "HomeTheater", "Refrigerator"]
    },
    3: {
        "category": "ComputerStorage",
        "sub_category": ["Laptop", "PhotocopierMachine", "Server"]
    },
    4: {
        "category": "Multimedia",
        "sub_category": ["LEDVideoWall", "LightSoundSystem", "Projector"]
    },
    5: {
        "category": "Security",
        "sub_category": []
    },
    6: {
        "category": "ClothesJewellery",
        "sub_category": ["GentsLadiesClothes", "JewelleryOrnaments"]
    },
    7: {
        "category": "Generator",
        "sub_category": ["Genset"]
    },
    8: {
        "category": "MediaEntertainmentEquipment",
        "sub_category": []
    },
    9: {
        "category": "Vehicle",
        "sub_category": ["Bus", "Car", "HeavyMachinery"]
    },
    10: {
        "category": "HealthSportMedicalEquipment",
        "sub_category": []
    },
    11: {
        "category": "PaintingHandicrafts",
        "sub_category": []
    },
    12: {
        "category": "TentHouseBanquetHall",
        "sub_category": []
    },
    13: {
        "category": "Miscellanous",
        "sub_category": []
    },
    14: {
        "category": "Furniture",
        "sub_category": []
    },
}

const category = document.getElementById("category");
const sub_category = document.getElementById("sub_category");
const cities = document.getElementById("cities");
const search = document.getElementById("search_button");
const product_container = document.getElementById("product_container");
const product_container_initial_state = product_container.innerHTML;


function categoryAdd() { //this function is called from index.html
    product_container.innerHTML = product_container_initial_state;
    console.log("cat changed");
    let selectedCategory = products[category.value];
    console.log(selectedCategory);
    sub_category.innerHTML = '<option value="null">-- Select Sub Category --</option>';
    selectedCategory.sub_category.forEach(addSubCategories);
}

function addSubCategories(item, index) {
    var option = document.createElement("option");
    option.value = index + 1;
    option.innerHTML = item;
    sub_category.appendChild(option);
}

function subcategoryChange() { //this function is also called from index.html
    console.log(sub_category.value);
    sendToServer(category, sub_category, true);
}

function cityChange() { //this function is also called from index.html
    sendToServer(category, sub_category, false);
}

// search.addEventListener("click", () => {
//     if (category.value != "null" && sub_category.value == "null")
//         alert("Select SubCategory also!");
//     else if (category.value != "null" && sub_category.value != "null")
//         sendToServer(category, sub_category);
//     else if (category.value == "null" && sub_category.value == "null")
//         alert("Select Category and SubCategory!");
//     else
//         product_container.innerHTML = product_container_initial_state;
// });


function sendToServer(category, sub_category, willCity) {
    var request = new XMLHttpRequest();
    request.open("POST", "/getProducts");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json");

    const product = {};
    product.category = category.value;
    product.sub_category = sub_category.value;
    product.cities = cities.value;
    const blob = new Blob([JSON.stringify(product, null, 2)], { type: 'application/json' });
    request.send(blob);

    let data;
    request.addEventListener("load", () => {
        data = request.responseText;
        data = JSON.parse(data);
        if (willCity)
            addCityOption(data);
        addToUI(data);
    });
}


function addToUI(products) {
    product_container.innerHTML = '';
    let div = document.createElement("div");
    div.setAttribute("class", "row gy-3");
    products.forEach(element => {
        let inner_div = document.createElement("div");
        inner_div.setAttribute("class", "col-md-4 col-sm-2 col-12");
        inner_div.innerHTML = element.body;
        div.appendChild(inner_div);
    });
    product_container.appendChild(div);
}

function addCityOption(products) {
    cities.innerHTML = '<option value="null">-- Select City --</option>'; //reset cities option
    let city = new Set();
    products.forEach(element => {
        city.add(element.city);
    });

    city.forEach(element => {
        var option = document.createElement("option");
        option.innerHTML = element;
        option.value = element;
        cities.appendChild(option);
    });
}
//filter management finished^



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
                t.setAttribute("href", "#");
                t.setAttribute("onclick", "fun1()");
                t.innerHTML = "Requests";
                var p = document.createElement("li");
                p.appendChild(t);
                logout.parentNode.appendChild(p);
            }
        }
    }
}

function fun1() {
    var request = new XMLHttpRequest();
    request.open("GET", "/vendorRequestPage");
    request.send();
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








{
    /*

        INSERT INTO products (category_id, subcategory_id, body)
    VALUES(9,3, '<div class="card">
                        <div class="card-body hover-shadow">
                            <a href="Static/Vehicle/HeavyMachinery/Product04/index.html" class="">
                                <img src="Res/Vehicles/HeavyMachinery/pic4.jpeg" class="img-fluid w-100 card-img" alt="Visual Softech" style="height: 250px;" rel="nofollow">
                                <div class="card-body">
                                    <p class="card-title">Heavy machinery on hire</p>
                                    <p class="card-title">Multiple Brands</p>
                                    <p class="card-text">>228, Vardhaman Market, Vashi Sector 17, Navi Mumbai - 400703, ICICI Bank</p>
                                    <p class="card-text">
                                        Maharashtra Mumbai 400703
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>');



    page_path =
    Static/Vehicle/HeavyMachinery/Product04/index.html



    image_path =
    Res/Property/Residence/pic1.jpg


    <div class="card">
                            <div class="card-body hover-shadow">
                                <a href="Static/Property/ResidentialProperty/Product01/index.html" class="">
                                    <img src="Res/Property/Residence/pic1.jpg" class="img-fluid w-100 card-img" alt="Visual Softech" style="height: 250px;" rel="nofollow">
                                    <div class="card-body">
                                        <p class="card-title">Two Room Set in Delhi, Shahpur Jat</p>
                                        <p class="card-title">2 Room</p>
                                        <p class="card-text"> Delhi, Shahpur Jat</p>
                                        <p class="card-text">
                                            9 New Delhi 1
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>


    */
}