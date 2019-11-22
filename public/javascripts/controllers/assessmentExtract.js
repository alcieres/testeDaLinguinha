$(document).ready(function() {

    $.getJSON( "/assessment/patient/requestAssessment", {
            patient: patientId,
            assessment: assessmentId
    })
        .done(function(data) {
            console.log( data );
            let patient = new Patient(
                data.patient._id,
                //Tela 01
                data.patient.name,
                new Date(data.patient.birthDate),
                data.patient.genre,
                data.patient.motherName,
                data.patient.motherCPF,
                data.patient.fatherName,
                data.patient.address,
                data.patient.residenceNumber,
                data.patient.neighborhood,
                data.patient.state,
                data.patient.city,
                data.patient.cep,
                data.patient.email,
                data.patient.resTel,
                data.patient.commercialTel,
                data.patient.celPhone,
                data.patient.familyHistory,
                data.patient.problemDescription,
                data.patient.patientHealthProblem,
                data.patient.healthProblemDescription,
                //Início do Exame
                data.patient.assessments[0]._id,
                new Date(data.patient.assessments[0].assessmentDate),
                data.patient.assessments[0].breastfeeding,
                data.patient.assessments[0].breastfeedingTime,
                data.patient.assessments[0].breastfeedingTiredness,
                data.patient.assessments[0].breastfeedingSleep,
                data.patient.assessments[0].releasingNipple,
                data.patient.assessments[0].biteNipple,
                data.patient.assessments[0].obsBreastfeeding,
                //Tela 02
                data.patient.assessments[0].questionOne,
                data.patient.assessments[0].questionTwo,
                data.patient.assessments[0].questionThree,
                //Tela 03
                data.patient.assessments[0].questionFour,
                data.patient.assessments[0].questionFourOne,
                data.patient.assessments[0].questionFourTwo,
                data.patient.assessments[0].questionFourThree,
                data.patient.assessments[0].questionFourComments,
                //Tela 04
                data.patient.assessments[0].partTwoQuestionOne,
                data.patient.assessments[0].partTwoQuestionTwoOne,
                data.patient.assessments[0].partTwoQuestionTwoTwo,
                data.patient.assessments[0].partTwoQuestionTwoThree,
                data.patient.assessments[0].partTwoQuestionTwoFour,
                data.patient.assessments[0].obsSuction,
                //Tela 05
                data.patient.assessments[0].obsResume,
                data.patient.assessments[0].behavior,
                data.patient.assessments[0].descBehavior,
                //Usuário
                data.patient.assessments[0].userCPF,
                data.patient.assessments[0].userName,
                data.patient.assessments[0].userLastName,
                data.patient.assessments[0].userOccupation,
                data.patient.assessments[0].userRegistry
            );
          console.log( patient );
          $("#resName").text(patient.name);
          $("#resGenre").text(patient.genreToText());
          $("#resMotherName").text(patient.motherName);
          $("#resBirthDate").text(patient.birthDateToText());
          $("#resFatherName").text(patient.fatherName);
          $("#resAssessmentDate").text(patient.assessmentDateToText(0));
          $("#resFamilyHistory").text(patient.familyHistoryToText());
          $("#resProblemDescription").text(patient.problemDescription);
          $("#resPatientHealthProblem").text(patient.patientHealthProblemToText());
          $("#resHealthProblemDescription").text(patient.healthProblemDescription);
          $("#resBreastfeeding").text(patient.breastfeedingToText(0));
          $("#resBreastfeedingTime").text(patient.breastfeedingTimeToText(0));
          $("#resBreastfeedingTiredness").text(patient.breastfeedingTirednessToText(0));
          $("#resBreastfeedingSleep").text(patient.breastfeedingSleepToText(0));
          $("#resReleasingNipple").text(patient.releasingNippleToText(0));
          $("#resBiteNipple").text(patient.biteNippleToText(0));
          $("#resObsBreastfeeding").text(patient.assessment[0].obsBreastfeeding);
          //Pontos das questões da história Clínica
          let clinicalHistoryPoints = patient.ClinicalHistoryPoints(0);
          $("#resClinicalHistoryPoints").text(clinicalHistoryPoints);
          (clinicalHistoryPoints < 4) ? $("#resClinicalHistoryPoints").addClass("badge-success") : $("#resClinicalHistoryPoints").addClass("badge-danger");

          $("#resQuestionOne").text(patient.questionOneToText(0));
          $("#resQuestionTwo").text(patient.questionTwoToText(0));
          $("#resQuestionThree").text(patient.questionThreeToText(0));

          //Pontos das questões 1 a 3
          let oneToThreeQuestionsPoints = patient.oneToThreeQuestionsPoints(0);
          $("#resQuestionsOneToThreePoints").text(oneToThreeQuestionsPoints);
          (oneToThreeQuestionsPoints < 4) ? $("#resQuestionsOneToThreePoints").addClass("badge-success") : $("#resQuestionsOneToThreePoints").addClass("badge-danger");

          $("#resQuestionFour").text(patient.questionFourToText(0));
          $("#resQuestionFourOne").text(patient.questionFourOneToText(0));
          $("#resQuestionFourTwo").text(patient.questionFourTwoToText(0));
          $("#resQuestionFourThree").text(patient.questionFourThreeToText(0));
          $("#resQuestionFourComments").text(patient.assessment[0].questionFourComments);

          //Total de pontos da questão 4
          let fourQuestionPoints = patient.fourQuestionPoints(0);
          $("#resQuestionFourPoints").text(fourQuestionPoints);
          (fourQuestionPoints < 3) ? $("#resQuestionFourPoints").addClass("badge-success") : $("#resQuestionFourPoints").addClass("badge-danger");

          //Total de pontos das questões 1 a 4
          let oneToFourQuestionsPoints = oneToThreeQuestionsPoints + fourQuestionPoints;
          $("#resQuestionsOneToFourPoints").text(oneToFourQuestionsPoints);
          (oneToFourQuestionsPoints < 7) ? $("#resQuestionsOneToFourPoints").addClass("badge-success") : $("#resQuestionsOneToFourPoints").addClass("badge-danger");

          $("#resPartTwoQuestionOne").text(patient.partTwoQuestionOneToText(0));
          $("#resPartTwoQuestionTwoOne").text(patient.partTwoQuestionTwoOneToText(0));
          $("#resPartTwoQuestionTwoTwo").text(patient.partTwoQuestionTwoTwoToText(0));
          $("#resPartTwoQuestionTwoThree").text(patient.partTwoQuestionTwoThreeToText(0));
          $("#resPartTwoQuestionTwoFour").text(patient.partTwoQuestionTwoFourToText(0));
          $("#resObsSuction").text(patient.assessment[0].obsSuction);

          //Colocar total de pontos da avaliação da sucção não nutritiva e nutritiva
          let partTwoQuestionPoints = patient.partTwoQuestionPoints(0);
          $("#resPartTwoQuestionPoints").text(partTwoQuestionPoints);
          (partTwoQuestionPoints < 2) ? $("#resPartTwoQuestionPoints").addClass("badge-success") : $("#resPartTwoQuestionPoints").addClass("badge-danger");

          //Colocar total de pontos do do exame clínico
          let clinicalAssessmentPoints = oneToFourQuestionsPoints + partTwoQuestionPoints;
          $("#resClinicalAssessmentPoints").text(clinicalAssessmentPoints);
          (clinicalAssessmentPoints < 9) ? $("#resClinicalAssessmentPoints").addClass("badge-success") : $("#resClinicalAssessmentPoints").addClass("badge-danger");

          //Colocar total de geral de pontos
          let historyAssessmentPoints = clinicalHistoryPoints + clinicalAssessmentPoints;
          $("#resHistoryAssessmentPoints").text(historyAssessmentPoints);
          (historyAssessmentPoints < 13) ? $("#resHistoryAssessmentPoints").addClass("badge-success") : $("#resHistoryAssessmentPoints").addClass("badge-danger");

          //Resultado
          $("#resObsFinal").text(patient.assessment[0].obsResume);
          $("#resBehavior").text(patient.behaviorText(0));
          $("#resBehaviorDescription").text(patient.assessment[0].descBehavior);
          $("#resUserFullName").text(patient.assessment[0].userName + " " + patient.assessment[0].userLastName);
          $("#resUserOccupation").text(patient.assessment[0].userOccupation);
          $("#resUserRegistry").text(patient.assessment[0].userRegistry);
        })
        .fail(function() {
            console.log( "error" );
        })
        .always(function() {
            console.log( "complete" );
        });





});