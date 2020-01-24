$(document).ready(function() {
  // Configuração do botão voltar
  $('#backBtn').click(function() {
    window.history.back();
    //window.location = "/users";
  });

  $('#cleanBtn').click(function() {
    $('#findPatientsForm').each (function(){
      this.reset();
    });
  });

  $('#findBtn').click(function() {
    $('#findPatientsForm').submit();
  });


  //Inicialização e configuração do JQueryUi datepicker
  let dateCalendarField = $( ".dateCalendar" );
  datepickerFormat(dateCalendarField);



});