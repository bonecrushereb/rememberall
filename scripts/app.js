
$(function() {
  $("#datepicker").datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
  });
});

document.getElementById('add').addEventListener("click", function add() {
  event.preventDefault();
  var allTodos = JSON.parse(localStorage.getItem("allTodos"));
  if (localStorage.tasks !=null) {
    localStorage.removeItem('tasks');
  }

  if (allTodos == null) allTodos = [];
  var task = document.getElementById('task').value;
  var prior = document.getElementById('priority').value;
  var date = document.getElementById('datepicker').value;

  var tasks = {
    "task": task,
    "priority": prior,
    "date": date
  };

  if (task == "" && prior == "" && date == "") {
    alert("please fill in required fields");
  } else if (task == ""){
    alert("please fill in the task name");
  } else if (prior == "") {
    alert("what is the priority of the task?");
  } else {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    allTodos.push(tasks);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
  }

  show();

  return false;
});

function show() {
  localStorage.removeItem('tasks');
  var allTodos = JSON.parse(localStorage.getItem("allTodos"));
  var html = '<ul>';
  for(var i=0; i<allTodos.length; i++) {
      html += '<li>' + allTodos[i].priority + '&nbsp;&nbsp;&nbsp;' + allTodos[i].task + '&nbsp;&nbsp;&nbsp;' + allTodos[i].date + '&nbsp; <button class="remove" id="' + i  + '">Done</button></li>';
  };
  html += '</ul>';

  document.getElementById('todos').innerHTML = html;

  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function remove() {
      console.log("button clicked");
      var id = this.getAttribute('id');
      allTodos.splice(id, 1);
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
      show();
    });
  };
  return false;
}
show();
