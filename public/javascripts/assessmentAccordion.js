let createAccordion = (accordionDivId, accordionId) => {
  $(accordionDivId).append('<div id=' + accordionId + '>');
  $( function() {
    $('#' + accordionId).accordion({
      collapsible: true,
      active: false,
      heightStyle: "content",
      beforeActivate: function(event, ui) {
        let currHeader;
        let currContent;
        //O acordeão acredita que um painel está sendo aberto
        if (ui.newHeader[0]) {
          currHeader  = ui.newHeader;
          currContent = currHeader.next('.ui-accordion-content');
          //O acordeão acredita que um painel está sendo fechado
        } else {
          currHeader  = ui.oldHeader;
          currContent = currHeader.next('.ui-accordion-content');
        }
        //Como alteramos o comportamento padrão, isso detecta o status real
        let isPanelSelected = currHeader.attr('aria-selected') === 'true';
        //Alternar o cabeçalho do painel
        currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
        //Alterne o ícone do painel
        currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
        //Alternar o conteúdo do painel
        currContent.toggleClass('accordion-content-active',!isPanelSelected);
        if (isPanelSelected){
          currContent.slideUp();
        } else {
          currContent.slideDown();
        }
        // Cancelar a ação padrão
        return false;
      }
    });
  } );
};

let accordionLine = (question, answer) => {
  return '<div class="row align-items-center border-bottom mb-2">'
      + '<div class="col-12 col-sm-12 col-md-4 col-lg-4 mr-auto">'
      + '<p class="mb-0 font-weight-bold">' + question + '</span></p>'
      + '</div>'
      + '<div class="col-12 col-sm-12 col-md-8 col-lg-8 mr-auto">'
      + '<p class="mb-0">' + answer + '</p>'
      + '</div>'
      + '</div>';
};

let createAccordions = () => {
  createAccordion('#accordionBreastfeedingDiv', 'accordionBreastfeeding');
  createAccordion('#accordionQuestionsOneToThreeDiv', 'accordionQuestionsOneToThree');
  createAccordion('#accordionQuestionFourDiv', 'accordionQuestionFour');
  createAccordion('#accordionPartTwoDiv', 'accordionPartTwo');
  createAccordion('#accordionFinalResumeDiv', 'accordionFinalResume');
};

let accordionWrite = (assessment) => {
  let newItem =
      '<h3 class="font-weight-bold">' + dateToText(assessment.getAssessmentDate()) + '</h3>'
      + '<div>'
      + accordionLine('Mama no peito?', assessment.breastfeedingToText())
      + accordionLine('Tempo entre as mamadas:', assessment.breastfeedingTimeToText())
      + accordionLine('Cansaço para mamar?', assessment.breastfeedingTirednessToText())
      + accordionLine('Mama um pouquinho e dorme?', assessment.breastfeedingSleepToText())
      + accordionLine('Vai soltando o mamilo?', assessment.releasingNippleToText())
      + accordionLine('Morde o mamilo?', assessment.biteNippleToText())
      + accordionLine('Observações:', assessment.getObsBreastfeeding())
      + accordionLine('Total da história clínica:', assessment.getClinicalHistoryPoints())
      + '</div>';
  $('#accordionBreastfeeding').append(newItem);
  newItem =
      '<h3 class="font-weight-bold">' + dateToText(assessment.getAssessmentDate()) + '</h3>'
      + '<div>'
      + accordionLine('1. Postura dos lábios em repouso:', assessment.questionOneToText())
      + accordionLine('2. Tendência do posicionamento da língua durante o choro:', assessment.questionTwoToText())
      + accordionLine('3. Forma da ponta da língua quando elevada durante o choro:', assessment.questionThreeToText())
      + accordionLine('Total da avaliação anatomofuncional </br>(itens 1, 2 e 3):', assessment.getQuestionsOneToThreePoints())
      + '</div>';
  $('#accordionQuestionsOneToThree').append(newItem);
  newItem =
      '<h3 class="font-weight-bold">' + dateToText(assessment.getAssessmentDate()) + '</h3>'
      + '<div>'
      + accordionLine('4. Frênulo da língua:', assessment.questionFourToText())
      + accordionLine('4.1. Espessura do frênulo:', assessment.questionFourOneToText())
      + accordionLine('4.2. Fixação do frênulo na face sublingual (ventral) da língua:', assessment.questionFourTwoToText())
      + accordionLine('4.3. Fixação do frênulo no assoalho da boca:', assessment.questionFourThreeToText())
      + accordionLine('Observações:', assessment.getQuestionFourComments())
      + accordionLine('Total da avaliação anatomofuncional </br>(item 4):', assessment.getQuestionFourPoints())
      + accordionLine('Total da avaliação anatomofuncional </br>(itens 1, 2, 3 e 4):', assessment.getQuestionsOneToFourPoints())
      + '</div>';
  $('#accordionQuestionFour').append(newItem);
  newItem =
      '<h3 class="font-weight-bold">' + dateToText(assessment.getAssessmentDate()) + '</h3>'
      + '<div>'
      + accordionLine('1.1. Movimento da língua:', assessment.partTwoQuestionOneToText())
      + accordionLine('2.1. Ritmo da sucção:', assessment.partTwoQuestionTwoOneToText())
      + accordionLine('2.2. Coordenação entre sucção/ deglutição/ respiração:', assessment.partTwoQuestionTwoTwoToText())
      + accordionLine('2.3. "Morde" o mamilo:', assessment.partTwoQuestionTwoThreeToText())
      + accordionLine('2.4 Estalos de língua durante a sucção:', assessment.partTwoQuestionTwoFourToText())
      + accordionLine('Observações:', assessment.getObsSuction())
      + accordionLine('Total da avaliação da sucção não nutritiva e nutritiva:', assessment.getPartTwoQuestionPoints())
      + accordionLine('Total geral da história e do exame clínico:', assessment.getClinicalAssessmentPoints())
      + '</div>';
  $('#accordionPartTwo').append(newItem);
  newItem =
      '<h3 class="font-weight-bold">' + dateToText(assessment.getAssessmentDate()) + '</h3>'
      + '<div>'
      + accordionLine('Observações:', assessment.getObsResume())
      + accordionLine('Conduta:', assessment.assBehaviorToText())
      + accordionLine('Descrição:', assessment.getDescBehavior())
      + '</div>';
  $('#accordionFinalResume').append(newItem);
};