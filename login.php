<?php
$username = null;
$password = null;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  require_once('database.php');

  if(!empty($_POST["username"]) && !empty($_POST["password"])
  {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $query = $connection->prepare("SELECT `user_id` FROM `users` WHERE `user_login` = ? and `user_password` = PASSWORD(?)");
    $query->bind_param("ss", $username, $password);
    $query->execute();
    $query->bind_result($userid);
    $query->fetch();
    $query->close();

    if(!empty($userid)) {
      session_start();
      $session_key = session_id();

      $query = $connection->prepare("INSERT INTO `sessions` ( `user_id`, `session_key`, `session_address`, `session_useragent`, `session_expires`) VALUES ( ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR) );");
      $query->bind_param("isss", $userid, $session_key, $_SERVER['REMOTE_ADDR'], $_SERVER['HTTP_USER_AGENT'] );
      $query->execute();
      $query->close();

      header('Location: index.php');
    }
    else {
      header('Location: login.php');
    }
  } else {
    header('Location: login.php');
  }
} else {
 ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-eqiv="content-type" content="text/html; charset=utf-8">
    <title>To-do List</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div id="page">
      <header id="banner">
        <hgroup>
          <h1>Login</h1>
        </hgroup>
      </header>
      <secion id="content">
        <form id="login" method="post">
          <label for="username">Username:</label>
          <input id="username" name="username" type="text" required>
          <label for="password">Password:</label>
          <input id="password" name="password" type="password" required>
          <br>
          <input type="submit" value="login">
        </form>
      </secion>
    </div>
  </body>
</html>
<?php } ?>
