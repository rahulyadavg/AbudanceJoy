const express = require("express");
const moment = require("moment");
const mysql = require("mysql");
const session = require("express-session");
const res = require("express/lib/response");

const app = express();

app.listen("3000", () => {
    console.log("Server is live on port 3000");
});

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


//Create DB Connections
let sql_details = {
    host: "localhost",
    user: "root",
    password: "",
    database: "abudancejoy"
}

const db = mysql.createConnection(sql_details);

//connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connection done with database abudancejoy");
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});



//implementing filter on main page
function filterProducts(req, res) {
    let catid = req.body.category;
    let subcatid = req.body.sub_category;
    let cities = req.body.cities;
    console.log(catid, subcatid, cities);

    if (cities == "null") {
        var data = [{ category_id: catid }, { subcategory_id: subcatid }];
        var sql = "SELECT * FROM products where ? and ?";
    } else {
        var data = [{ category_id: catid }, { subcategory_id: subcatid }, { city: cities }];
        var sql = "SELECT * FROM products where ? and ? and ?";
    }
    queryDatabase(sql, data, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
}

app.post("/getProducts", filterProducts);


//for visitor signup
app.post("/signup", userSignup);

function userSignup(req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;

    var data = [{ email: email }];
    var sql = "SELECT * from users where ?";
    checkUserInDatabase(data, sql, (user) => {
        if (user === null) {
            console.log("new user found");
            var post = { name: name, phone: phone, email: email, password: password };
            var sql = "INSERT INTO users SET ?";
            queryDatabase(sql, post, (err, result) => {
                if (err) throw err;
                else {
                    req.session.isLoggedIn = true;
                    req.session.name = name;
                    res.end(JSON.stringify({ user_exist: false, email: email }));
                }
            });
        } else {
            console.log("Existing user found with same email id!!!");
            res.end(JSON.stringify({ user_exist: true, email: email }));
        }
    });
}


//for visitor Login
app.post("/login", userLogin);

function userLogin(req, res) {
    console.log(req.session);
    var email = req.body.email;
    var password = req.body.password;

    var data = [{ email: email }, { password: password }];
    var sql = "SELECT user_id, name, phone, email FROM users where ? and ?";
    checkUserInDatabase(data, sql, (user) => {
        if (user === null) {
            console.log("no user found to login");
            res.end(JSON.stringify({ user_found: false }));
        } else {
            let name = user[0].name;
            req.session.isLoggedIn = true;
            req.session.userType = "Visitor";
            req.session.name = name;
            req.session.user_id = user[0].user_id;
            req.session.email = user[0].email;
            req.session.phone = user[0].phone;
            console.log("user found with name " + name);
            res.end(JSON.stringify({ user_found: true, name: name }));
        }
    });
}
//login post end



//for vendor signup
app.post("/vendorSignup", vendorSignup);

function vendorSignup(req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;

    var data = [{ email: email }];
    var sql = "SELECT * from vendor where ?";
    checkUserInDatabase(data, sql, (user) => {
        if (user === null) {
            console.log("new vendor found");
            var post = { name: name, phone: phone, email: email, password: password };
            var sql = "INSERT INTO vendor SET ?";
            queryDatabase(sql, post, (err, result) => {
                if (err) throw err;
                else {
                    req.session.isLoggedIn = true;
                    req.session.name = name;
                    res.end(JSON.stringify({ user_exist: false, email: email }));
                }
            });
        } else {
            console.log("Existing vendor found with same email id!!!");
            res.end(JSON.stringify({ user_exist: true, email: email }));
        }
    });
}


//for vendor Login
app.post("/vendorLogin", vendorLogin);

function vendorLogin(req, res) {
    console.log(req.session);
    var email = req.body.email;
    var password = req.body.password;

    var data = [{ email: email }, { password: password }];
    var sql = "SELECT user_id, name, email, phone FROM vendor where ? and ?";
    checkUserInDatabase(data, sql, (user) => {
        if (user === null) {
            console.log("no user found to login");
            res.end(JSON.stringify({ user_found: false }));
        } else {
            let name = user[0].name;
            req.session.isLoggedIn = true;
            req.session.userType = "Vendor";
            req.session.name = name;
            req.session.user_id = user[0].user_id;
            req.session.email = user[0].email;
            req.session.phone = user[0].phone;
            console.log("vendor found with name " + name);
            res.end(JSON.stringify({ user_found: true, name: name }));
        }
    });
}




//checking user is logged in or not
app.get("/userLog", (req, res) => {
    if (req.session.isLoggedIn) {
        console.log("user already logged in!!!");
        res.end(JSON.stringify({ name: req.session.name, userType: req.session.userType, user_id: req.session.user_id, email: req.session.email, phone: req.session.phone }));
    } else {
        console.log("User is not logged in yet!!!");
        res.end(JSON.stringify({ name: null }));
    }
});


app.get("/vendorRequestPage", (req, res) => {
    console.log("Vendor request page asked");
    res.redirect("/vd");
});
//user log check ends
app.get("/vd", foo);

function foo(req, res) {
    console.log("redircted rres ho gwa upr");
    res.sendFile(__dirname + "/vendor.html");

    console.log("redircted rres ho gwa niche");
};



//user logged out
app.post("/logoutUser", (req, res) => {
    console.log("user logging out request found!");
    req.session.isLoggedIn = false;
    res.end();
});



//Contact Us
app.post("/contactUs", contactUs);

function contactUs(req, res) {
    console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let comment = req.body.comment;

    var data = { name: name, email: email, contact: contact, comment: comment };
    var sql = "INSERT INTO contact_us SET ?";
    queryDatabase(sql, data, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
}




//enquiry
app.post("/enquiry", enquiry);

function enquiry(req, res) {
    console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let location = req.body.location;
    let subject = req.body.subject;
    let body = req.body.body;


    var data = { name: name, email: email, contact: contact, location: location, subject: subject, body: body };
    var sql = "INSERT INTO enquiry SET ?";
    queryDatabase(sql, data, (err, result) => {
        if (err) throw err;
        res.end();
    });
}



//suggestion
app.post("/suggestion", suggestion);

function suggestion(req, res) {
    console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let age = req.body.age;
    let phone = req.body.phone;
    let message = req.body.message;

    var data = { name: name, email: email, age: age, phone: phone, message: message };
    var sql = "INSERT INTO suggestions SET ?";
    queryDatabase(sql, data, (err, result) => {
        if (err) throw err;
        res.end();
    });
}



//feedback
app.post("/feedback", feedback);

function feedback(req, res) {
    console.log(req.body);
    let message = req.body.message;
    let email = req.body.email;

    var data = { message: message, email: email };
    var sql = "INSERT INTO feedback SET ?";
    queryDatabase(sql, data, (err, result) => {
        if (err) throw err;
        res.end();
    });
}





//report
app.post("/report", report);

function report(req, res) {
    console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let age = req.body.age;
    let message = req.body.message;

    var data = { name: name, email: email, phone: phone, age: age, message: message };
    var sql = "INSERT INTO report SET ?";
    queryDatabase(sql, data, (err, result) => {
        if (err) throw err;
        res.end();
    });
}



//send request for products
app.post("/sendRequest", sendRequest);

function sendRequest(req, res) {
    console.log(req.body);
    let product_id = req.body.product_id;
    let user_id = req.session.user_id;
    var data = { product_id: product_id };
    var sql = "Select vendor_id from products where ?";
    let vendor_id;
    checkUserInDatabase(data, sql, (result) => {
        if (result == null)
            res.end(JSON.stringify(false));
        else {
            vendor_id = result[0].vendor_id;
            console.log(vendor_id);
            insertIntoRequestDatabase(user_id, vendor_id, product_id);
        }
    });
}


function insertIntoRequestDatabase(user_id, vendor_id, product_id) {
    let t = new Date().toLocaleString().slice(0, 19).replace('T', ' ');
    t = t.split(' ');
    let date = t[0].replace(',', '');
    date = date.split("/").reverse();
    let temp = date[1];
    date[1] = date[2];
    date[2] = temp;
    date = date.join("-");

    var data = {
        user_id: user_id,
        vendor_id: vendor_id,
        product_id: product_id,
        request_date: date,
        request_time: t[1]
    };
    var sql = "INSERT INTO requests SET ?";
    queryDatabase(sql, data, (err, result) => {
        try {
            console.log("request bhej diya gaya");
            //res.end(true);
        } catch (err) {
            console.log("Kuchh to gadbad hai daya!");
            //res.end(false);
        }
        // if (err) {
        //     throw err;
        //     res.end(JSON.stringify(false));
        // }
        // res.end(JSON.stringify(true));
    });
}



function checkUserInDatabase(post, sql, callback) {
    queryDatabase(sql, post, (err, result) => {
        if (err) throw err;
        else {
            if (result.length == 0)
                return callback(null);
            else
                return callback(result);
        }
    });
}

function queryDatabase(sql, post, callback) {
    db.query(sql, post, (err, result) => {
        return callback(err, result);
    });
}













// function writeFile(path, data, callback) {
//     fs.writeFile(path, data, function(err) {
//         callback(err);
//     })
// }