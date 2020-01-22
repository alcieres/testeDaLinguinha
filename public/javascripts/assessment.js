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
    if (n === 0) {
      prevBtn.prop('disabled', true);
    } else {
      prevBtn.prop('disabled', false);
    }

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
    if (n === 1 && !validateForm()){
      return;
    }
    // Incrementa ou decrementa a tab atual
    currentTab = currentTab + n;
    //Envia o formulário na última tela
    if ((currentTab === tabs.length) && n === 1) {
      if(validateForm()) {
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
                patient.assessments[0].obsResume = $("#inputFinalReport").val();
                patient.assessments[0].assBehavior = $("input[name='rbBehavior']:checked").val();
                patient.assessments[0].descBehavior = $("#inputBehavior").val();
                $.ajax({
                  method: 'POST',
                  contentType: "application/json",
                  url: '/assessment',
                  data: JSON.stringify(patient),
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
  findCities('RS');

  //Busca a lista de cidades no banco e atualiza a lista de cidades
  function findCities(state){
    $.getJSON( "city/citiesListByState", {
      state: state,
    })
        .done(function(data) {
          let citiesSelect =  $("#inputCity");
          citiesSelect.empty();
          $.each(data.cities, function (index, item) {
            citiesSelect.append(new Option(item.c, item.c));
          });
          if (state === 'RS'){
            citiesSelect.val('Osório');
          }
        })
        .fail(function() {
          console.log( "error" );
        });
  }

  // Desabilita radios de "Mama no peito?" por padrão ao carregar página da tela 01
  $(".breastfeedingCmd").prop('disabled', true);
  $(".breastfeedingCmdCss").css('opacity', '.2');

  // Função para desabilitar os botões caso clique em sem aleitamento materno
  $("input[name=rbBreastfeeding]").change(function() {
    if ($(this).val() === "3") {
      $(".breastfeedingCmd").prop('checked', false, 'disabled', true);
      $(".breastfeedingCmdCss").css('opacity', '.2');
    }
    // Caso outra opção seja marcada habilita os botões.
    else {
      $(".breastfeedingCmd").prop('disabled', false);
      $(".breastfeedingCmdCss").css('opacity', '1');
    }
  });

  //Setar data do exame como data de hoje
  $('input[type=date]').on('click', function(event) {
    event.preventDefault();
  });

  //Inicialização e configuração do JQueryUi datepicker
  let dateCalendarField = $( ".dateCalendar" );
  datepickerFormat(dateCalendarField);

  $( "#inputAssessmentDate" ).datepicker( "setDate", new Date());

  //Caso seja setada data superior a de hoje, o sistema retorna a data para a data de hoje
  // dateCalendarField.on('focusout', function () {
  //   let valueArray = dateCalendarField.val().split('-');
  //   let today = new Date();
  //   let dateSelected = new Date(valueArray[0], valueArray[1] - 1, valueArray[2]);
  //   console.log(dateCalendarField.val());
  //   dateCalendarField.val(today > dateSelected ? formatDate(dateSelected) : formatDate(today));
  // });
  // function formatDate(date) {
  //      let month = '' + (date.getMonth() + 1);
  //       let day = '' + date.getDate();
  //       let year = date.getFullYear();
  //   return [year, month, day].join('-');
  // }

  // document.getElementsByName("inputAssessmentDate")[0].valueAsDate = new Date();
  // let today = new Date();
  // let dd = today.getDate();
  // let mm = today.getMonth()+1; //January is 0!
  // let yyyy = today.getFullYear();
  // if(dd<10){
  //   dd='0'+dd
  // }
  // if(mm<10){
  //   mm='0'+mm
  // }
  // today = yyyy+'-'+mm+'-'+dd;
  // document.getElementById("inputAssessmentDate").setAttribute("max", today);
  //Limite da data para hoje no campo
  //???

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
  function successHandler (data) {
    let url = 'assessment/assessmentExtract?patientId=' + data.success[0].patientId + '&assessmentId=' + data.success[0].assessmentId;
    window.open(url, "_blank");
    //window.location.replace("/assessment")
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
    dados = data;
    data.responseJSON.error.forEach(error => console.log(error.msg));
    //console.log(data);
  }


}); //Fim document ready
let dados;