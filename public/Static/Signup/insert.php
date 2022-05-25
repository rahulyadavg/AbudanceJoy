<?php

if (isset($_POST['submit'])) {

    //fetch data
    $username = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $rpassword = $_POST['password-repeat'];

    if (isset($username) && isset($phone) &&
        isset($email) && isset($password) &&
        isset($rpassword)){

        if($password==$rpassword){
            //database setup
        $host = "localhost";
        $dbUsername = "root";
        $dbPassword = "";
        $dbName = "users";

        //establish connection
        $conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

        if ($conn->connect_error) {
            die('Could not connect to the database.');
        }
        else {

            $Select = "SELECT email FROM register WHERE email = ? LIMIT 1";
            $Insert = "INSERT INTO register(username, phone, email, password) values(?, ?, ?, ?)";

            $stmt = $conn->prepare($Select);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->bind_result($resultEmail);
            $stmt->store_result();
            $stmt->fetch();
            $rnum = $stmt->num_rows;

            if ($rnum == 0) {
                $stmt->close();

                $stmt = $conn->prepare($Insert);
                $stmt->bind_param("siss",$username, $phone, $email, $password);
                if ($stmt->execute()) {
                    echo "New record inserted sucessfully.";
                    header('Location: ../../Static/Login/index.html');
                    exit();
                }
                else {
                    echo $stmt->error;
                }
            }
            else {
                echo "Someone already registers using this email.";
            }
            $stmt->close();
            $conn->close();
        }
        }else{
            echo "Password does not match repeat password!!!";
            die();
        }
    }
    else {
        echo "All field are required.";
        die();
    }
}
else {
    echo "Submit button is not set";
}
?>