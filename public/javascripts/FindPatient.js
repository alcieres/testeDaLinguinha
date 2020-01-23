$(document).ready(function() {
  // Configuração do botão voltar
  $('#backBtn').click(function() {
    window.history.back();
    //window.location = "/users";
  });

  $('#findBtn').click(function() {
    $.ajax({
      method: 'GET',
      url: '/findPatient/find',
      data: $('#findPatientsForm').serialize(),
      success: successHandler,
      error: errorHandler
    });
  });

  //Inicialização e configuração do JQueryUi datepicker
  let dateCalendarField = $( ".dateCalendar" );
  datepickerFormat(dateCalendarField);


});