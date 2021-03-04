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
    validateAndSubmit();
  });

  $('#findPatientsForm').keydown(function(e) {
    let key = e.which;
    if (key === 13) {
      validateAndSubmit();
    }
  });

function validateAndSubmit (){
  if (formNotEmpty()){
    if (validateFindPatient()){
      $('#findPatientsForm').submit();
    }
  } else {
    dialogHandler("Erro!", "Preencha pelo menos um campo para a busca.");
  }
}

  //Inicialização e configuração do JQueryUi datepicker
  let dateCalendarField = $( ".dateCalendar" );
  datepickerFormat(dateCalendarField);

  function dialogHandler (title, msg) {
    let dialog = $('#dialog-message');
    dialog.empty();
    dialog.append( "<p>" + msg + "</p>" );
    $( function() {
      $( "#dialog-message" ).dialog({
        dialogClass: "no-close",
        width: 500,
        title: title,
        modal: true,
        buttons: {
          Ok: function() {
            $( this ).dialog( "close" );
          }
        }
      });
    } );
  }
});