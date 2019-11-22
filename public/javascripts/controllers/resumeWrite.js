//Criação do paciente com os resultados da avaliação
function resumeWrite() {
    let patient = new Patient(
        '',
        //Tela 01
        $('#inputName').val(),
        new Date($('#inputBirthDate').val()),
        $("input[name='rbGenre']:checked").val(),
        $('#inputMotherName').val(),
        $('#inputMotherCPF').val(),
        $('#inputFatherName').val(),
        $('#inputAddress').val(),
        $('#inputResidenceNumber').val(),
        $('#inputNeighborhood').val(),
        $('#inputState').val(),
        $('#inputCity').val(),
        $('#inputCEP').val(),
        $('#inputEmail').val(),
        $('#inputResTel').val(),
        $('#inputCommercialTel').val(),
        $('#inputCelPhone').val(),
        $("input[name='rbFamilyHistory']:checked").val(),
        $("#inputProblemDescription").val(),
        $("input[name='rbPatientHealthProblem']:checked").val(),
        $("#inputHealthProblemDescription").val(),
        //Início do Exame
        '',
        new Date($('#inputAssessmentDate').val()),
        $("input[name='rbBreastfeeding']:checked").val(),
        $("input[name='rbBreastfeedingTime']:checked").val(),
        $("input[name='rbBreastfeedingTiredness']:checked").val(),
        $("input[name='rbBreastfeedingSleep']:checked").val(),
        $("input[name='rbReleasingNipple']:checked").val(),
        $("input[name='rbBiteNipple']:checked").val(),
        $("#obsBreastfeeding").val(),
        //Tela 02
        $("input[name='rbQuestionOne']:checked").val(),
        $("input[name='rbQuestionTwo']:checked").val(),
        $("input[name='rbQuestionThree']:checked").val(),
        //Tela 03
        $("input[name='rbQuestionFour']:checked").val(),
        $("input[name='rbQuestionFourOne']:checked").val(),
        $("input[name='rbQuestionFourTwo']:checked").val(),
        $("input[name='rbQuestionFourThree']:checked").val(),
        $("#inputQuestionFourComments").val(),
        //Tela 04
        $("input[name='rbPartTwoQuestionOne']:checked").val(),
        $("input[name='rbPartTwoQuestionTwoOne']:checked").val(),
        $("input[name='rbPartTwoQuestionTwoTwo']:checked").val(),
        $("input[name='rbPartTwoQuestionTwoThree']:checked").val(),
        $("input[name='rbPartTwoQuestionTwoFour']:checked").val(),
        $("#inputSuctionComments").val(),
        //Tela 05
        "",
        "",
        "",
        //Usuário
        "",
        "",
        "",
        "",
        ""
    );
    console.log(patient);
    //Inserindo os itens na tela final
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
}