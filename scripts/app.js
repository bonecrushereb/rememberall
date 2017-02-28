function ConvertFormToJSON(form) {
  var array = $(form).serializeArray();
  var json = {};

  $.each(array, function() {
    json[this.name] = this.value || '';
  });

  return json;
}

jQuery(document).on('ready', function() {
  jQuery('form#add-new-task').bind('submit', function(event){
    event.preventDefault();

    var form = this;
    var json = ConvertFormToJSON(form);
    var tbody = jQuery('#to-do-list > tbody');

    $.ajax({
      type: "POST",
      url: "submit.php",
      data: json,
      dataType: "json"
    }).success(function(state) {
      if(state.success === true) {
        tbody.append('<tr><th scope="row" style="background-color:' + state['color'] +
          '"><input type="checkbox" /></th><td>' + state['date'] +
          '</td><td>' + state['priority'] + '</td><td>' + state['name'] +
          '</td><td>' + state['desc'] + '</td><td>' + state['email'] + '</td></tr>');
      } else {
        alert(state.error.join());
      }
    }).fail(function(state) {
      alert("Failed to add to-do");
    });

    return true;
  });
});
