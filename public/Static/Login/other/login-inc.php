
    <?php
       include_once 'dbh_inc.php';

       $email = mysqli_real_escape_string($conn, $_POST['email']);
       $pwd = mysqli_real_escape_string($conn, $_POST['pwd']);


      $sql = "SELECT user_email FROM users WHERE user_email = '$email';";
      $sql1 = "SELECT user_pwd FROM users WHERE user_email = '$email';";
      $sql2 = "SELECT user_first FROM users WHERE user_email = '$email';";
      $result1 = mysqli_query($conn, $sql);
      $result2 = mysqli_query($conn, $sql1);
      $result3 = mysqli_query($conn, $sql2);
      while ($row1 = mysqli_fetch_assoc($result1)) {
        $checkemail = $row1['user_email'];
      }
      while ($row2 = mysqli_fetch_assoc($result2)) {
        $checkpwd = $row2['user_pwd'];
      }
      while ($row3 = mysqli_fetch_assoc($result3)) {
        $name = $row3['user_first'];
      }
      if ($checkemail == $email && $checkpwd == $pwd) {
      //  $flag=1;
        $message = "Logged in Successfully";
        echo "<script type='text/javascript'>alert('$message');
            window.location.href='../afterlogin/NAYANDEEPindexmain.php?/$name';
        </script>";
      }
      else {
      //  $flag=0;
        $message = "Email or password is incorrect!";
        echo "<script type='text/javascript'>alert('$message');
          window.location.href='login.php';
        </script>";
      }
    /*  if ($flag == 1) {
      header("Location: ../indexmain.php?login=success/user name=".$result);
    }elseif ($flag == 0) {
       header("Location: login.php?login=success/result=loginfailed");
    }*/
