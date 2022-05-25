<?php

if (isset($_POST['submit'])) {

    //fetch data
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (isset($email) && isset($password)){

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
            $sql = "SELECT email FROM register WHERE email = '$email';";
            $sql1 = "SELECT password FROM register WHERE email = '$email';";
            $sql2 = "SELECT username FROM register WHERE email = '$email';";
            $result1 = mysqli_query($conn, $sql);
            $result2 = mysqli_query($conn, $sql1);
            $result3 = mysqli_query($conn, $sql2);
            while ($row1 = mysqli_fetch_assoc($result1)) {
                $checkemail = $row1['email'];
            }
            while ($row2 = mysqli_fetch_assoc($result2)) {
                $checkpwd = $row2['password'];
            }
            while ($row3 = mysqli_fetch_assoc($result3)) {
                $name = $row3['username'];
            }
            if ($checkemail == $email && $checkpwd == $password) {
            //  $flag=1;
                $message = "Logged in Successfully";
                echo "<script type='text/javascript'>alert('$message');
                    window.location.href='../../index.html?/$name';
                </script>";
            }
      else {
      //  $flag=0;
        $message = "Email or password is incorrect!";
        echo "<script type='text/javascript'>alert('$message');
          window.location.href='index.html';
        </script>";
      }

        }     
}
else{
    echo "email or password not set";
}
}else {
    echo "Submit button is not set";
}
?>