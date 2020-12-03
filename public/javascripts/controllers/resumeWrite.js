//Criação do paciente com os resultados da avaliação
let testPatient;

function resumeWrite() {
    let patient = new Patient();
    //Tela 01
    patient.setName($('#inputName').val());
    patient.setBirthDate(new Date($('#inputBirthDate').val()));
    patient.setGenre($("input[name='rbGenre']:checked").val());
    patient.setMotherName($('#inputMotherName').val());
    patient.setMotherCPF($('#inputMotherCPF').val());
    patient.setFatherName($('#inputFatherName').val());
    patient.setAddress($('#inputAddress').val());
    patient.setResidenceNumber($('#inputResidenceNumber').val());
    patient.setNeighborhood($('#inputNeighborhood').val());
    patient.setState($('#inputState').val());
    patient.setCity($('#inputCity').val());
    patient.setCep($('#inputCEP').val());
    patient.setEmail($('#inputEmail').val());
    patient.setResTel($('#inputResTel').val());
    patient.setCommercialTel($('#inputCommercialTel').val());
    patient.setCelPhone($('#inputCelPhone').val());
    patient.setFamilyHistory($("input[name='rbFamilyHistory']:checked").val());
    patient.setProblemDescription($("#inputProblemDescription").val());
    patient.setPatientHealthProblem($("input[name='rbPatientHealthProblem']:checked").val());
    patient.setHealthProblemDescription($("#inputHealthProblemDescription").val());
    //Início do Exame
    let assessment = new Assessment();
    assessment.setAssessmentDate(new Date($('#inputAssessmentDate').val()));
    assessment.setBreastfeeding($("input[name='rbBreastfeeding']:checked").val());
    assessment.setBreastfeedingTime($("input[name='rbBreastfeedingTime']:checked").val());
    assessment.setBreastfeedingTiredness($("input[name='rbBreastfeedingTiredness']:checked").val());
    assessment.setBreastfeedingSleep($("input[name='rbBreastfeedingSleep']:checked").val());
    assessment.setReleasingNipple($("input[name='rbReleasingNipple']:checked").val());
    assessment.setBiteNipple($("input[name='rbBiteNipple']:checked").val());
    assessment.setObsBreastfeeding($("#obsBreastfeeding").val());
    //Tela 02
    assessment.setQuestionOne($("input[name='rbQuestionOne']:checked").val());
    assessment.setQuestionTwo($("input[name='rbQuestionTwo']:checked").val());
    assessment.setQuestionThree($("input[name='rbQuestionThree']:checked").val());
    //Tela 03
    assessment.setQuestionFour($("input[name='rbQuestionFour']:checked").val());
    assessment.setQuestionFourOne($("input[name='rbQuestionFourOne']:checked").val());
    assessment.setQuestionFourTwo($("input[name='rbQuestionFourTwo']:checked").val());
    assessment.setQuestionFourThree($("input[name='rbQuestionFourThree']:checked").val());
    assessment.setQuestionFourComments($("#inputQuestionFourComments").val());
    //Tela 04
    assessment.setPartTwoQuestionOne($("input[name='rbPartTwoQuestionOne']:checked").val());
    assessment.setPartTwoQuestionTwoOne($("input[name='rbPartTwoQuestionTwoOne']:checked").val());
    assessment.setPartTwoQuestionTwoTwo($("input[name='rbPartTwoQuestionTwoTwo']:checked").val());
    assessment.setPartTwoQuestionTwoThree($("input[name='rbPartTwoQuestionTwoThree']:checked").val());
    assessment.setPartTwoQuestionTwoFour($("input[name='rbPartTwoQuestionTwoFour']:checked").val());
    assessment.setObsSuction($("#inputSuctionComments").val());
    //Insere teste no paciente e atualiza a pontuação
    patient.assessments.push(assessment);
    patient.updateHistoryAssessmentPoints(0);
    //Escreve dados do paciente e exame na tela
    testPatient = patient;
    writePatient(patient);

    return patient;
}