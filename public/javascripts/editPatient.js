$(document).ready(function() {

  //Inicialização e configuração do JQueryUi datepicker
  let dateCalendarField = $( ".dateCalendar" );
  datepickerFormat(dateCalendarField);

  //Atualiza lista de cidades quando se muda o estado
  let inputState = $('#inputState');
  inputState.val(patient.state);
  findCities(inputState.val(), patient.city);
  inputState.change(function() {
    findCities(inputState.val(), "")
  });

  $('#inputName').val(patient.name);
  $('#inputBirthDate').val(formatDate (patient.birthDate));
  $('#inputFatherName').val(patient.fatherName);
  $("input[name='rbGenre'][value='"+ patient.genre +"']").prop('checked', true);
  $('#inputMotherName').val(patient.motherName);
  $('#inputMotherCPF').val(patient.motherCPF).mask('000.000.000-00');
  $('#inputAddress').val(patient.address);
  $('#inputResidenceNumber').val(patient.residenceNumber);
  $('#inputNeighborhood').val(patient.neighborhood);
  $('#inputCity').val(patient.city);
  $('#inputCEP').val(patient.cep).mask('00000-000');
  $('#inputEmail').val(patient.email);
  $('#inputResTel').val(patient.resTel).mask('(00) 0000-00000');
  $('#inputCommercialTel').val(patient.commercialTel).mask('(00) 0000-00000');
  $('#inputCelPhone').val(patient.celPhone).mask('(00) 0000-00000');

  $('#backBtn').click(function() {
    window.location.replace("/findPatient/" + patient._id);
  });

  $('#saveBtn').click(function() {
    if(validateForm('#editPatient')) {
      $(function() {
        $( "#dialog-confirm" ).dialog({
          resizable: false,
          height: "auto",
          dialogClass: "no-close",
          width: 400,
          modal: true,
          buttons: {
            Sim: function() {
              $( this ).dialog( "close" );
              $.ajax({
                method: 'PUT',
                url: '/editPatient/patient/' + patient._id,
                data: $('#editPatient').serialize(),
                success: successHandler,
                error: errorHandler
              });
            },
            'Não': function() {
              $( this ).dialog( "close" );
            }
          }
        });
      });
    }
  });

  function successHandler () {
    window.location.replace("/findPatient/" + patient._id);
  }

  function errorHandler (data) {
    let dialog = $('#dialog-message');
    dialog.empty();
    data.responseJSON.error.forEach(error => (dialog.append( "<p>" + error.msg + "</p>" )));

    $( function() {
      $( "#dialog-message" ).dialog({
        dialogClass: "no-close",
        width: 500,
        title: "Erro de Validação do Teste",
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