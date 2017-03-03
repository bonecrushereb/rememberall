<?php
require_once('authenticate.php')
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Todo-List</title>
    <link href="css/reset.css" rel="stylesheet" type="text/css">
    <link href="css/style.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <section id="content">
      <article id="to-do">
        <section class="new-do-do">
          <header>
            <h2>Add a new task</h2>
          </header>
          <form id="add-new-task">
            <label for="new-task-name">Name:</label>
            <input id="new-task-name" name="new-task-name" type="text" required>
            <label for="new-task-date">Date:</label>
            <input id="new-task-date" name="new-task-date" type="datetime" required>
            <br/>
            <label for="new-task-priority">Priority:</label>
            <input id="new-task-priority" name="new-task-priority" type="number" required min="1" max="5" step="1" value="2">
            <label for="new-task-color">Color:</label>
            <input id="new-task-color" name="new-task-color" type="color">
            <br/>
            <label for="new-task-desc">Description:</label>
            <input id="new-task-desc" name="new-task-desc" type="text">
            <br/>
            <label for="new-task-email">Invite:</label>
            <input id="new-task-email" name="new-task-email" type="email" multiple>
            <br />
            <input type="submit" value="Add new">
          </form>
        </section>
        <section>
          <header>
            <h2>To Do list</h2>
          </header>
        </section>
          <table id="to-do-list">
            <caption>What to do next?</caption>
            <colgroup>
              <col>
              <col>
              <col>
              <col>
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Date</th>
                <th scope="col">Priority</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Invitees</th>
              </tr>
            </thead>
            <tbody>

<?php
global $user_id;
$query = $connection->prepare("SELECT `task_id`, `task_name`, `task_priority`, `task_color`, `task_description`, `task_attendees`, `task_date` FROM `tasks` WHERE `user_id` = ?");
$query->bind_param("i", $user_id);
$query->execute();

$query->bind_result($id, $name, $priority, $color, $description, $attendees, $date);
while ($query->fetch()) {
	echo '<tr id="task-' . $id . '"><th scope="row" style="background-color:' . $color . '"><input type="checkbox" /></th><td>' . $date . '</td><td>' . $priority . '</td><td>' . $name . '</td><td>' . $description . '</td><td>' . $attendees . '</td></tr>';
}

$query->close();
?>
            </tbody>
          </table>
      </article>
    </section>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script src="scripts/app.js"></script>
  </body>
</html>
