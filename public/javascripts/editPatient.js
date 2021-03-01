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
    if ('referrer' in document) {
      //window.location = document.referrer;
      /* OR */
      location.replace(document.referrer);
    } else {
      window.history.back();
    }
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
              let patientToSend = {};
              patientToSend.name = $('#inputName').val();
              patientToSend.birthDate = $('#inputBirthDate').val();
              patientToSend.genre = $("input[name='rbGenre']:checked").val();
              patientToSend.motherName = $('#inputMotherName').val();
              patientToSend.motherCPF = $('#inputMotherCPF').val();
              patientToSend.fatherName = $('#inputFatherName').val();
              patientToSend.address = $('#inputAddress').val();
              patientToSend.residenceNumber = $('#inputResidenceNumber').val();
              patientToSend.neighborhood = $('#inputNeighborhood').val();
              patientToSend.state = $('#inputState').val();
              patientToSend.city = $('#inputCity').val();
              patientToSend.cep = $('#inputCEP').val();
              patientToSend.email = $('#inputEmail').val();
              patientToSend.resTel = $('#inputResTel').val();
              patientToSend.commercialTel = $('#inputCommercialTel').val();
              patientToSend.celPhone = $('#inputCelPhone').val();

              $( this ).dialog( "close" );
              $.ajax({
                method: 'PUT',
                url: '/editPatient/patient/' + patient._id,
                data: patientToSend,
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
    //window.location.replace("/findPatient/" + patient._id);
    if ('referrer' in document) {
      //window.location = document.referrer;
      /* OR */
      location.replace(document.referrer);
    } else {
      window.history.back();
    }
  }

  function errorHandler (data) {
    let dialog = $('#dialog-message');
    dialog.empty();
    data.responseJSON.error.forEach(error => (dialog.append( "<p>" + error.msg + "</p>" )));

    $( function() {
      $( "#dialog-message" ).dialog({
        dialogClass: "no-close",
        width: 500,
        title: "Erro de Atualização!",
        modal: true,
        buttons: {
          Ok: function() {
            $( this ).dialog( "close" );
          }
        }
      });
    });
  }
});