$(document).ready(function() {

  //Inicialização e configuração do JQueryUi datepicker
  let dateCalendarField = $( ".dateCalendar" );
  datepickerFormat(dateCalendarField);

  //Atualiza lista de cidades quando se muda o estado
  let inputState = $('#inputState');
  inputState.val(patient.state);
  findCities(inputState.val(), patient.city);
  console.log(patient.city);
  inputState.change(function() {
    findCities(inputState.val(), "")
  });


  $('#backBtn').click(function() {
    window.history.back();
  });

  $('#saveBtn').click(function() {
    alert("Esse botão vai SALVAR as alterações no paciente");
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

//Formata a data UTC eno formato  yyyy-MM-dd
  function formatDate (date)
  {
    date = new Date(date);
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    if(d < 10) {
      d = '0' + d
    }
    if(m < 10) {
      m = '0' + m
    }
    return y + "-" + m + "-" + d;
  }


});