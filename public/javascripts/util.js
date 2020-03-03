//Função que formata o JQuery datepicker
function datepickerFormat(dateField) {
 dateField.datepicker({
   dateFormat: 'yy-mm-dd',
   dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
   dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
   dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
   monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
   monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
   nextText: 'Próximo',
   prevText: 'Anterior',
   maxDate: '+0m +0w'
 });
}

//Busca a lista de cidades no banco e atualiza a lista de cidades
function findCities(state, city){
  $.getJSON( "/city/citiesListByState", {
    state: state,
  })
      .done(function(data) {
        let citiesSelect =  $("#inputCity");
        citiesSelect.empty();
        $.each(data.cities, function (index, item) {
          citiesSelect.append(new Option(item.c, item.c));
        });

          if(city){
            $.each(data.cities, function (index, item) {
              if (!item.c.toString().localeCompare(city, 'en', {sensitivity: 'base'})){
                citiesSelect.val(item.c);
              }
            });
          }
      })
      .fail(function() {
        console.log( "error" );
      });
}

//Formata a data UTC no formato  yyyy-MM-dd
function formatDate (date)
{
  date = Date(date);
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

function dateToText (date)
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
  return d + "/" + m + "/" + y;
}

//Transforma um JSON de paciente em um Objeto paciente
function jsonToPatient(data){
  let patient = new Patient();
  patient.setPatientId(data.patient._id);
//Tela 01
  patient.setName( data.patient.name);
  patient.setBirthDate(new Date(data.patient.birthDate));
  patient.setGenre(data.patient.genre);
  patient.setMotherName(data.patient.motherName);
  patient.setMotherCPF(data.patient.motherCPF);
  patient.setFatherName(data.patient.fatherName);
  patient.setAddress(data.patient.address);
  patient.setResidenceNumber(data.patient.residenceNumber);
  patient.setNeighborhood(data.patient.neighborhood);
  patient.setState(data.patient.state);
  patient.setCity(data.patient.city);
  patient.setCep(data.patient.cep);
  patient.setEmail(data.patient.email);
  patient.setResTel(data.patient.resTel);
  patient.setCommercialTel(data.patient.commercialTel);
  patient.setCelPhone(data.patient.celPhone);
  patient.setFamilyHistory(data.patient.familyHistory);
  patient.setProblemDescription(data.patient.problemDescription);
  patient.setPatientHealthProblem(data.patient.patientHealthProblem);
  patient.setHealthProblemDescription( data.patient.healthProblemDescription);

  data.patient.assessments.forEach((item, index) => {
    //Início do Exame
    let assessment = new Assessment();
    assessment.setAssessmentId(item._id);
    assessment.setAssessmentDate(new Date(item.assessmentDate));
    assessment.setBreastfeeding(item.breastfeeding);
    assessment.setBreastfeedingTime(item.breastfeedingTime);
    assessment.setBreastfeedingTiredness(item.breastfeedingTiredness);
    assessment.setBreastfeedingSleep(item.breastfeedingSleep);
    assessment.setReleasingNipple(item.releasingNipple);
    assessment.setBiteNipple(item.biteNipple);
    assessment.setObsBreastfeeding(item.obsBreastfeeding);
    //Pontos História Clínica
    assessment.setClinicalHistoryPoints(item.clinicalHistoryPoints);
    assessment.setQuestionOne(item.questionOne);
    //Tela 02
    assessment.setQuestionTwo(item.questionTwo);
    assessment.setQuestionThree(item.questionThree);
    //Pontos Questões de Um a Três
    assessment.setQuestionsOneToThreePoints(item.questionsOneToThreePoints);
    //Tela 03
    assessment.setQuestionFour(item.questionFour);
    assessment.setQuestionFourOne(item.questionFourOne);
    assessment.setQuestionFourTwo( item.questionFourTwo);
    assessment.setQuestionFourThree(item.questionFourThree);
    assessment.setQuestionFourComments(item.questionFourComments);
    //Pontos Questão 4
    assessment.setQuestionFourPoints(item.questionFourPoints);
    //Pontos da Parte I
    assessment.setQuestionsOneToFourPoints(item.questionsOneToFourPoints);
    //Tela 04
    assessment.setPartTwoQuestionOne(item.partTwoQuestionOne);
    assessment.setPartTwoQuestionTwoOne(item.partTwoQuestionTwoOne);
    assessment.setPartTwoQuestionTwoTwo(item.partTwoQuestionTwoTwo);
    assessment.setPartTwoQuestionTwoThree(item.partTwoQuestionTwoThree);
    assessment.setPartTwoQuestionTwoFour(item.partTwoQuestionTwoFour);
    assessment.setObsSuction(item.obsSuction);
    //Pontos da Parte II
    assessment.setPartTwoQuestionPoints(item.partTwoQuestionPoints);
    //Pontos Totais Exame Clínico
    assessment.setClinicalAssessmentPoints(item.clinicalAssessmentPoints);
    //Pontos Totais do Exame
    assessment.setHistoryAssessmentPoints(item.historyAssessmentPoints);
    //Tela 05
    assessment.setObsResume(item.obsResume);
    assessment.setAssBehavior(item.assBehavior);
    assessment.setDescBehavior(item.descBehavior);
    //Usuário
    assessment.setUserCPF(item.userCPF);
    assessment.setUserName(item.userName);
    assessment.setUserLastName(item.userLastName);
    assessment.setUserOccupation(item.userOccupation);
    assessment.setUserRegistry(item.userRegistry);
    patient.assessments.push(assessment);
  });
   return patient;
}

function writePatient(patient){
  //Início do processo de escrever na tela
  $("#resName").text(patient.getName());
  $("#resGenre").text(patient.genreToText());
  $("#resMotherName").text(patient.getMotherName());
  $("#resBirthDate").text(patient.birthDateToText());
  $("#resFatherName").text(patient.getFatherName());
  $("#resAssessmentDate").text(patient.assessments[0].assessmentDateToText());
  $("#resFamilyHistory").text(patient.familyHistoryToText());
  $("#resProblemDescription").text(patient.getProblemDescription());
  $("#resPatientHealthProblem").text(patient.patientHealthProblemToText());
  $("#resHealthProblemDescription").text(patient.getHealthProblemDescription());
  $("#resBreastfeeding").text(patient.assessments[0].breastfeedingToText());
  $("#resBreastfeedingTime").text(patient.assessments[0].breastfeedingTimeToText());
  $("#resBreastfeedingTiredness").text(patient.assessments[0].breastfeedingTirednessToText());
  $("#resBreastfeedingSleep").text(patient.assessments[0].breastfeedingSleepToText());
  $("#resReleasingNipple").text(patient.assessments[0].releasingNippleToText());
  $("#resBiteNipple").text(patient.assessments[0].biteNippleToText());
  $("#resObsBreastfeeding").text(patient.assessments[0].getObsBreastfeeding());
  //Pontos das questões da história Clínica
  let clinicalHistoryPoints = patient.assessments[0].getClinicalHistoryPoints();
  let resClinicalHistoryPoints = $("#resClinicalHistoryPoints");
  resClinicalHistoryPoints.text(clinicalHistoryPoints);
  (clinicalHistoryPoints < 4) ? resClinicalHistoryPoints.addClass("badge-success") : resClinicalHistoryPoints.addClass("badge-danger");
  // Início do Exame
  $("#resQuestionOne").text(patient.assessments[0].questionOneToText());
  $("#resQuestionTwo").text(patient.assessments[0].questionTwoToText());
  $("#resQuestionThree").text(patient.assessments[0].questionThreeToText());
  //Pontos das questões 1 a 3
  let oneToThreeQuestionsPoints = patient.assessments[0].getQuestionsOneToThreePoints();
  let resQuestionsOneToThreePoints = $("#resQuestionsOneToThreePoints");
  resQuestionsOneToThreePoints.text(oneToThreeQuestionsPoints);
  (oneToThreeQuestionsPoints < 4) ? resQuestionsOneToThreePoints.addClass("badge-success") : resQuestionsOneToThreePoints.addClass("badge-danger");
  //Tela 03
  $("#resQuestionFour").text(patient.assessments[0].questionFourToText());
  $("#resQuestionFourOne").text(patient.assessments[0].questionFourOneToText());
  $("#resQuestionFourTwo").text(patient.assessments[0].questionFourTwoToText());
  $("#resQuestionFourThree").text(patient.assessments[0].questionFourThreeToText());
  $("#resQuestionFourComments").text(patient.assessments[0].getQuestionFourComments());
  //Total de pontos da questão 4
  let fourQuestionPoints = patient.assessments[0].getQuestionFourPoints();
  let resQuestionFourPoints = $("#resQuestionFourPoints");
  resQuestionFourPoints.text(fourQuestionPoints);
  (fourQuestionPoints < 3) ? resQuestionFourPoints.addClass("badge-success") : resQuestionFourPoints.addClass("badge-danger");
  //Total de pontos das questões 1 a 4
  let oneToFourQuestionsPoints = patient.assessments[0].getQuestionsOneToFourPoints();
  let resQuestionsOneToFourPoints = $("#resQuestionsOneToFourPoints");
  resQuestionsOneToFourPoints.text(oneToFourQuestionsPoints);
  (oneToFourQuestionsPoints < 7) ? resQuestionsOneToFourPoints.addClass("badge-success") : resQuestionsOneToFourPoints.addClass("badge-danger");
  //Tela 4
  $("#resPartTwoQuestionOne").text(patient.assessments[0].partTwoQuestionOneToText());
  $("#resPartTwoQuestionTwoOne").text(patient.assessments[0].partTwoQuestionTwoOneToText());
  $("#resPartTwoQuestionTwoTwo").text(patient.assessments[0].partTwoQuestionTwoTwoToText());
  $("#resPartTwoQuestionTwoThree").text(patient.assessments[0].partTwoQuestionTwoThreeToText());
  $("#resPartTwoQuestionTwoFour").text(patient.assessments[0].partTwoQuestionTwoFourToText());
  $("#resObsSuction").text(patient.assessments[0].getObsSuction());
  //Total de pontos da avaliação da sucção não nutritiva e nutritiva
  let partTwoQuestionPoints = patient.assessments[0].getPartTwoQuestionPoints();
  let resPartTwoQuestionPoints = $("#resPartTwoQuestionPoints");
  resPartTwoQuestionPoints.text(partTwoQuestionPoints);
  (partTwoQuestionPoints < 2) ? resPartTwoQuestionPoints.addClass("badge-success") : resPartTwoQuestionPoints.addClass("badge-danger");
  //Total de pontos do do exame clínico
  let clinicalAssessmentPoints = patient.assessments[0].getClinicalAssessmentPoints();
  let resClinicalAssessmentPoints = $("#resClinicalAssessmentPoints");
  resClinicalAssessmentPoints.text(clinicalAssessmentPoints);
  (clinicalAssessmentPoints < 9) ? resClinicalAssessmentPoints.addClass("badge-success") : resClinicalAssessmentPoints.addClass("badge-danger");
  //Total de geral de pontos
  let historyAssessmentPoints = patient.assessments[0].getHistoryAssessmentPoints();
  let resHistoryAssessmentPoints = $("#resHistoryAssessmentPoints");
  resHistoryAssessmentPoints.text(historyAssessmentPoints);
  (historyAssessmentPoints < 13) ? resHistoryAssessmentPoints.addClass("badge-success") : resHistoryAssessmentPoints.addClass("badge-danger");
}