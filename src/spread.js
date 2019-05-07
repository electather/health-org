import { ipcRenderer } from 'electron';

$('#infection-rate').dependsOn({
  // The selector for the depenency
  '#infection-name': {
    // The dependency qualifiers
    not: [''],
    contains: ['3']
  }
});

$('#healing-rate').dependsOn({
  // The selector for the depenency
  '#infection-name': {
    // The dependency qualifiers
    not: [''],
    contains: ['3']
  }
});

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i) {
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

document.querySelector('#spread-cal-form').addEventListener('submit', event => {
  event.preventDefault();
  var $form = $('#spread-cal-form');
  if ($form.valid()) {
    var data = getFormData($form);
    console.log(data);
    ipcRenderer.send('infectionData:send', data);
  }
});
