$(document).ready(function() {

  //Inicialização e configuração do JQueryUi datepicker
  let dateCalendarField = $( ".dateCalendar" );
  datepickerFormat(dateCalendarField);

  //Atualiza lista de cidades quando se muda o estado
  let inputState = $('#inputState');
  inputState.change(function() {
    findCities(inputState.val())
  });


  $('#backBtn').click(function() {
    window.history.back();
  });

  $('#saveBtn').click(function() {
    alert("Esse botão vai SALVAR as alterações no paciente");
  });
});