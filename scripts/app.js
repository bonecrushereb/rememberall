var allTodos = JSON.parse(localStorage.getItem("allTodos"));

$(function() {
  $("#datepicker").datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
  });
});

document.getElementById('add').addEventListener("click", function add() {
  event.preventDefault();

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

  return allTodos;
});

function show(allTodos) {
  localStorage.removeItem('tasks');
  JSON.parse(localStorage.getItem('allTodos'));
  var table = document.getElementById("todoTable");
  var allTodos = JSON.parse(localStorage.getItem("allTodos"));
  var table = document.getElementById('todoTable');
  var tr = document.createElement('tr');
  for (var i = 0; i < allTodos.length; i++) {
    tr.id = allTodos[i].task;
    var el = ('<td>' + allTodos[i].task + '</td>' + '<td>' + allTodos[i].priority + '</td>' +
              '<td>' + allTodos[i].date + '</td>' + '<td>' + '<button class="remove" id="' + i +'">DONE</button>' + '</td>');
   tr.innerHTML = el;
   table.appendChild(tr);
  };

  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function remove() {
      var id = this.getAttribute('id');
      allTodos.splice(id, 1);
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
      $(document.getElementById(tr.id)).remove();
    });
  };
}
