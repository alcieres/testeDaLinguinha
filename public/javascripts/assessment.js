$(document).ready(function() {
  //Cria novo Paciente
  let patient;
  // Formulário principal multi passos
  //Seta a tab inicial como 0
  let currentTab = 0;
  //Seta botão voltar
  let prevBtn = $('#prevBtn');
  //Seta botão avançar
  let nextBtn = $('#nextBtn');
  //Transforma as tabs em um array
  const tabs = $('.tab');
  //Exibir 1º tab
  showTab(currentTab);

  // Click do botão voltar do formulário
  prevBtn.click(function(){
    if (currentTab === 0){
      window.history.back();
    }
    nextPrev(-1);
    $('html, body').scrollTop(0);
  });
  // Click do botão avançar do formulário
  nextBtn.click(function(){
    nextPrev(1);
    $('html, body').scrollTop(0);
  });

  function showTab(n) {
    // Exibe a tab atual na tela
    tabs[n].style.display = "block";
    //Desabilita o botão voltar na primeira tela e habilita nas próximas
    // if (n === 0) {
    //   prevBtn.prop('disabled', true);
    // } else {
    //   prevBtn.prop('disabled', false);
    // }

    if (n === (tabs.length - 1)) {
      nextBtn.text('Concluir');
      //Chama a função que preenche o resumo final com os dados escritos e marcados
      patient = resumeWrite();
    } else {
      nextBtn.text('Próxima');
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
  }

  //Função que avança e volta as telas
  function nextPrev(n) {

    // Sair da função se algum dado do formulário for inválido
    if (n === 1 && !validateForm('#assForm')){
      return;
    }
    // Incrementa ou decrementa a tab atual
    currentTab = currentTab + n;
    //Envia o formulário na última tela
    if ((currentTab === tabs.length) && n === 1) {
      if(validateForm('#assForm')) {
        $(function() {
          switch(mode) {
            case '1':
              insertNewPatient();
              break;
            case '2':
              editPatientAssessment();
              break;
            case '3':
              newPatientAssessment();
              break;
          }
        });
      }
      currentTab --;
    }else {
      // Esconde a tab atual
      tabs[currentTab - n].style.display = "none";
      // Mostra a nova guia
      showTab(currentTab);
    }
  }

  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    let i, x = $('.step');
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
  }

  //Atualiza lista de cidades quando se muda o estado
  let inputState = $('#inputState');
  inputState.change(function() {
    findCities(inputState.val())
  });

  //Seleciona estado com "RS"
  inputState.val('RS');
  findCities('RS', 'Osório');

  // Desabilita radios de "Mama no peito?" por padrão ao carregar página da tela 01
  $(".breastfeedingCmd").prop('disabled', true);
  $(".breastfeedingCmdCss").css('opacity', '.2');
  $(".breastfeedingDiv").hide();

  // Função para desabilitar os botões caso clique em sem aleitamento materno
  $("input[name=rbBreastfeeding]").change(function() {
    if ($(this).val() === "3") {
      $(".breastfeedingCmd").prop('checked', false, 'disabled', true, 'click', false);
      $(".breastfeedingCmdCss").css('opacity', '.2');
      $(".breastfeedingDiv").hide();
    }
    // Caso outra opção seja marcada habilita os botões.
    else {
      $(".breastfeedingCmd").prop('disabled', false, 'checked', false);
      $(".breastfeedingCmdCss").css('opacity', '1');
      $(".breastfeedingDiv").show();
    }
  });

  //Inicialização e configuração do JQueryUi datepicker
  let dateCalendarField = $( ".dateCalendar" );
  datepickerFormat(dateCalendarField);

  $( "#inputAssessmentDate" ).datepicker( "setDate", new Date());

  // Desabilitar radios da Questão 4 por padrão ao carregar página da tela 03
  $(".questionFourCmd").prop('disabled', true);
  $(".questionFourCmdCss").css('opacity', '.2');

  // Função para desabilitar os botões caso clique em sem aleitamento materno
  $("input[name=rbQuestionFour]").change(function() {
    if ($(this).val() === "2") {
      $(".questionFourCmd").prop('checked', false, 'disabled', true);
      $(".questionFourCmdCss").css('opacity', '.2');
    }
    // Caso outra opção seja marcada habilita os botões.
    else {
      $(".questionFourCmd").prop('disabled', false);
      $(".questionFourCmdCss").css('opacity', '1');
    }
  });

  let insertNewPatient = function () {
    jQuery("#dialogMsg").text("Confirma a inclusão do exame?");
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      dialogClass: "no-close",
      width: 400,
      modal: true,
      buttons: {
        Sim: function() {
          $( this ).dialog( "close" );
          patient.assessments[0].setObsResume($("#inputFinalReport").val());
          patient.assessments[0].setAssBehavior($("input[name='rbBehavior']:checked").val());
          patient.assessments[0].setDescBehavior($("#inputBehavior").val());
          $.ajax({
            method: 'POST',
            contentType: "application/json",
            url: '/assessment',
            data: patient.toJSON(0),
            success: successHandler,
            error: errorHandler
          });
        },
        'Não': function() {
          $( this ).dialog( "close" );
        }
      }
    });
    function successHandler (data) {
      let url = 'assessment/assessmentExtract?patientId=' + data.success[0].patientId + '&assessmentId=' + data.success[0].assessmentId;
      window.open(url, "_blank");
      window.location.replace("/assessment")
    }
  };

  // Edita um teste já realizado
  let editPatientAssessment = function () {
    jQuery("#dialogMsg").text("Confirma a edição do exame?");
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      dialogClass: "no-close",
      width: 400,
      modal: true,
      buttons: {
        Sim: function() {
          $( this ).dialog( "close" );
          patient.setPatientId(patientId);
          patient.assessments[0].setAssessmentId(assessmentId);
          patient.assessments[0].setObsResume($("#inputFinalReport").val());
          patient.assessments[0].setAssBehavior($("input[name='rbBehavior']:checked").val());
          patient.assessments[0].setDescBehavior($("#inputBehavior").val());
          console.log(patient.toJSON(0));
          $.ajax({
            method: 'PUT',
            contentType: "application/json",
            url: '/editPatient/assessmentEdit',
            data: patient.toJSON(0),
            success: successHandler,
            error: errorHandler
          });
        },
        'Não': function() {
          $( this ).dialog( "close" );
        }
      }
    });
    function successHandler (data) {
      let url = '/assessment/assessmentExtract?patientId=' + data.success[0].patientId + '&assessmentId=' + data.success[0].assessmentId;
      window.open(url, "_blank");
      window.location.replace("/assessment")
    }
  };

  let newPatientAssessment = function () {
    jQuery("#dialogMsg").text("Confirma a inclusão do exame?");
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      dialogClass: "no-close",
      width: 400,
      modal: true,
      buttons: {
        Sim: function() {
          $( this ).dialog( "close" );
          patient.setPatientId(patientId);
          patient.assessments[0].obsResume = $("#inputFinalReport").val();
          patient.assessments[0].assBehavior = $("input[name='rbBehavior']:checked").val();
          patient.assessments[0].descBehavior = $("#inputBehavior").val();
          $.ajax({
            method: 'PUT',
            contentType: "application/json",
            url: '/editPatient/assessmentNew',
            data: patient.toJSON(0),
            success: successHandler,
            error: errorHandler
          });
        },
        'Não': function() {
          $( this ).dialog( "close" );
        }
      }
    });
    function successHandler (data) {
      let url = '/assessment/assessmentExtract?patientId=' + data.success[0].patientId + '&assessmentId=' + data.success[0].assessmentId;
      window.open(url, "_blank");
      window.location.replace("/assessment")
    }
  };

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

  if (mode === '2' || mode === '3'){
    $.getJSON( "/editPatient/requestPatient", {
      patient: patientId
    })
        .done(function(data) {
          let patientDB = jsonToPatient(data);
          $('#inputName').val(patientDB.getName());
          $('#inputBirthDate').val(formatDate(patientDB.getBirthDate()));
          $('#inputFatherName').val(patientDB.getFatherName());
          $("input[name='rbGenre'][value='"+ patientDB.getGenre() +"']").prop('checked', true);
          $('#inputMotherName').val(patientDB.getMotherName());
          $('#inputMotherCPF').val(patientDB.getMotherCPF()).mask('000.000.000-00');
          $('#inputAddress').val(patientDB.getAddress());
          $('#inputResidenceNumber').val(patientDB.getResidenceNumber());
          $('#inputNeighborhood').val(patientDB.getNeighborhood());
          //Atualiza lista de cidades quando se muda o estado
          inputState.val(patientDB.getState());
          findCities(inputState.val(), patientDB.getCity());
          $('#inputCity').val(patientDB.getCity());
          $('#inputCEP').val(patientDB.getCep()).mask('00000-000');
          $('#inputEmail').val(patientDB.getEmail());
          $('#inputResTel').val(patientDB.getResTel()).mask('(00) 0000-00000');
          $('#inputCommercialTel').val(patientDB.getCommercialTel()).mask('(00) 0000-00000');
          $('#inputCelPhone').val(patientDB.getCelPhone()).mask('(00) 0000-00000');
          $("input[name='rbFamilyHistory'][value='"+ patientDB.getFamilyHistory()+"']").prop('checked', true);
          $('#inputProblemDescription').val(patientDB.getProblemDescription());
          $("input[name='rbPatientHealthProblem'][value='"+ patientDB.getPatientHealthProblem() +"']").prop('checked', true);
          $('#inputHealthProblemDescription').val(patientDB.getHealthProblemDescription());
          switch (mode) {
            case '2':
              let assessmentIndex = 0;
              assessmentIndex = patientDB.assessments.findIndex(assessment => assessment.getAssessmentId() === assessmentId);
              $('#inputAssessmentDate').val(formatDate(patientDB.assessments[assessmentIndex].getAssessmentDate()));
              $("input[name='rbBreastfeeding'][value='"+ patientDB.assessments[assessmentIndex].getBreastfeeding() +"']").prop('checked', true).trigger('change');
              $("input[name='rbBreastfeedingTime'][value='"+ patientDB.assessments[assessmentIndex].getBreastfeedingTime() +"']").prop('checked', true);
              $("input[name='rbBreastfeedingTiredness'][value='"+ patientDB.assessments[assessmentIndex].getBreastfeedingTiredness() +"']").prop('checked', true);
              $("input[name='rbBreastfeedingSleep'][value='"+ patientDB.assessments[assessmentIndex].getBreastfeedingSleep() +"']").prop('checked', true);
              $("input[name='rbReleasingNipple'][value='"+ patientDB.assessments[assessmentIndex].getReleasingNipple() +"']").prop('checked', true);
              $("input[name='rbBiteNipple'][value='"+ patientDB.assessments[assessmentIndex].getBiteNipple() +"']").prop('checked', true);
              $('#obsBreastfeeding').val(patientDB.assessments[assessmentIndex].getObsBreastfeeding());
              $("input[name='rbQuestionOne'][value='"+ patientDB.assessments[assessmentIndex].getQuestionOne() +"']").prop('checked', true);
              $("input[name='rbQuestionTwo'][value='"+ patientDB.assessments[assessmentIndex].getQuestionTwo() +"']").prop('checked', true);
              $("input[name='rbQuestionThree'][value='"+ patientDB.assessments[assessmentIndex].getQuestionThree() +"']").prop('checked', true);
              $("input[name='rbQuestionFour'][value='"+ patientDB.assessments[assessmentIndex].getQuestionFour() +"']").prop('checked', true).trigger('change');
              $("input[name='rbQuestionFourOne'][value='"+ patientDB.assessments[assessmentIndex].getQuestionFourOne() +"']").prop('checked', true);
              $("input[name='rbQuestionFourTwo'][value='"+ patientDB.assessments[assessmentIndex].getQuestionFourTwo() +"']").prop('checked', true);
              $("input[name='rbQuestionFourThree'][value='"+ patientDB.assessments[assessmentIndex].getQuestionFourThree() +"']").prop('checked', true);
              $('#inputQuestionFourComments').val(patientDB.assessments[assessmentIndex].getQuestionFourComments());
              $("input[name='rbPartTwoQuestionOne'][value='"+ patientDB.assessments[assessmentIndex].getPartTwoQuestionOne() +"']").prop('checked', true);
              $("input[name='rbPartTwoQuestionTwoOne'][value='"+ patientDB.assessments[assessmentIndex].getPartTwoQuestionTwoOne() +"']").prop('checked', true);
              $("input[name='rbPartTwoQuestionTwoTwo'][value='"+ patientDB.assessments[assessmentIndex].getPartTwoQuestionTwoTwo() +"']").prop('checked', true);
              $("input[name='rbPartTwoQuestionTwoThree'][value='"+ patientDB.assessments[assessmentIndex].getPartTwoQuestionTwoThree() +"']").prop('checked', true);
              $("input[name='rbPartTwoQuestionTwoFour'][value='"+ patientDB.assessments[assessmentIndex].getPartTwoQuestionTwoFour() +"']").prop('checked', true);
              $('#inputSuctionComments').val(patientDB.assessments[assessmentIndex].getObsSuction());
              $('#inputFinalReport').val(patientDB.assessments[assessmentIndex].getObsResume());
              $("input[name='rbBehavior'][value='"+ patientDB.assessments[assessmentIndex].getAssBehavior() +"']").prop('checked', true);
              $('#inputBehavior').val(patientDB.assessments[assessmentIndex].getDescBehavior());
              if (patientDB.assessments.length > 1){
                createAccordions();
                patientDB.assessments.forEach(function (assessment) {
                  if (assessment.getAssessmentId() !== assessmentId){
                    accordionWrite(assessment);
                  }
                });
                $('.accordionDiv').show();
              }
              break;
            case '3':
              if (patientDB.assessments.length > 0){
                createAccordions();
                patientDB.assessments.forEach(function (assessment) {
                  accordionWrite(assessment);
                });
                $('.accordionDiv').show();
              }
              break;
          }
        })
        .fail(function() {
          console.log( "error" );
        })
        .always(function() {
          //console.log( "complete" );
        });
  }
}); //Fim document ready
