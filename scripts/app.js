var allTodos = JSON.parse(localStorage.getItem("allTodos"));

$(function() {
  $("#datepicker").datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
  });
});

document.getElementById('add').addEventListener("click", function add() {
  event.preventDefault();

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
  } else if (date == "") {
    alert("what date is the task due?");
  } else {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    allTodos.push(tasks);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
  }

  show();

  return allTodos;
});

function show(allTodos) {
  JSON.parse(localStorage.getItem('allTodos'));
  var table = document.getElementById("todoTable");
  var allTodos = JSON.parse(localStorage.getItem("allTodos"));
  for (var i = 0; i < allTodos.length; i++) {
    var row = table.insertRow();
    row.id=allTodos[i].task;
    row.class="task";
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = allTodos[i].task;
    cell2.innerHTML = allTodos[i].priority;
    cell3.innerHTML = allTodos[i].date;
    cell4.innerHTML = '<button class="remove" id="' + i +'">DONE</button>';
  };

  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function remove() {
      var id = this.getAttribute('id');
      allTodos.splice(id, 1);
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
      $(document.getElementById(row.id)).remove();
    });
  };
}


show(allTodos);
