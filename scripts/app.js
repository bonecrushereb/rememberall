
$(function() {
  $("#datepicker").datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
  });
});

function get_todos() {
  var todos_str = JSON.localStorage.getItem('allTodos');
  if (todos_str != null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}

function add() {
  console.log("hello from add");
  var allTodos = [];
  var task = document.getElementById('task').value;
  var prior = document.getElementById('priority').value;
  var date = document.getElementById('datepicker').value;

  var task = {
    "task": task,
    "priority": priority,
    "date": date
  };
  localStorage.setItem('todo', JSON.stringify(todo));
  allTodos.push(task);
  localStorage.setItem('allTodos', JSON.stringify(allTodos));

  return false;
}

document.getElementById('add').addEventListener("click", add);
