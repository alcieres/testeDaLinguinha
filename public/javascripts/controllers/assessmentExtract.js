$(document).ready(function() {

      $( "#prevBtn" ).click(function() {
            window.close();

      });
      $( "#nextBtn" ).click(function() {
            window.print();
            $('html, body').animate({scrollTop:$(document).height()}, 'fast');
      });

    $.getJSON( "/assessment/patient/requestAssessment", {
            patient: patientId,
            assessment: assessmentId
    })
        .done(function(data) {
            let patient = jsonToPatient(data);
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

            $("#resPartTwoQuestionOne").text(patient.assessments[0].partTwoQuestionOneToText());
            $("#resPartTwoQuestionTwoOne").text(patient.assessments[0].partTwoQuestionTwoOneToText());
            $("#resPartTwoQuestionTwoTwo").text(patient.assessments[0].partTwoQuestionTwoTwoToText());
            $("#resPartTwoQuestionTwoThree").text(patient.assessments[0].partTwoQuestionTwoThreeToText());
            $("#resPartTwoQuestionTwoFour").text(patient.assessments[0].partTwoQuestionTwoFourToText());
            $("#resObsSuction").text(patient.assessments[0].obsSuction);

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

            //Resultado
            $("#resObsFinal").text(patient.assessments[0].getObsResume());
            $("#resBehavior").text(patient.assessments[0].assBehaviorText());
            patient.assessments[0].getDescBehavior() === "" ? $("#resBehaviorDescriptionLabel").hide() : $("#resBehaviorDescription").text(patient.assessments[0].getDescBehavior());
            $("#resUserFullName").text(patient.assessments[0].getUserName() + " " + patient.assessments[0].getUserLastName());
            $("#resUserOccupation").text(patient.assessments[0].getUserOccupation());
            $("#resUserRegistry").text(patient.assessments[0].getUserRegistry());
        })
        .fail(function() {
            console.log( "error" );
        })
        .always(function() {
            //console.log( "complete" );
        });





});