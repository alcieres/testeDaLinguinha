function Patient () {
  let patientId;
  let name;
  let birthDate;
  let genre;
  let motherName;
  let motherCPF;
  let fatherName;
  let address;
  let residenceNumber;
  let neighborhood;
  let state;
  let city;
  let cep;
  let email;
  let resTel;
  let commercialTel;
  let celPhone;
  let familyHistory;
  let problemDescription;
  let patientHealthProblem;
  let healthProblemDescription;
  this.assessments = Array.from(Assessment);

  this.getPatientId = () => {
    return patientId;
  };
  this.setPatientId = (id) => {
    patientId = id;
  };
  this.getName = () => {
    return name;
  };
  this.setName = (data) => {
    name = data;
  };
  this.getBirthDate = () => {
    return birthDate;
  };
  this.setBirthDate = (data) => {
    birthDate = data;
  };
  this.getGenre = () => {
    return genre;
  };
  this.setGenre = (data) => {
    genre = data !== undefined ? data.toString() : undefined;
  };
  this.getMotherName = () => {
    return motherName;
  };
  this.setMotherName = (data) => {
    motherName = data;
  };
  this.getMotherCPF = () => {
    return motherCPF;
  };
  this.setMotherCPF = (data) => {
    motherCPF = data;
  };
  this.getFatherName = () => {
    return fatherName;
  };
  this.setFatherName = (data) => {
    fatherName = data;
  };
  this.getAddress = () => {
    return address;
  };
  this.setAddress = (data) => {
    address = data;
  };
  this.getResidenceNumber = () => {
    return residenceNumber;
  };
  this.setResidenceNumber = (data) => {
    residenceNumber = data;
  };
  this.getNeighborhood = () => {
    return neighborhood;
  };
  this.setNeighborhood = (data) => {
    neighborhood = data;
  };
  this.getState = () => {
    return state;
  };
  this.setState = (data) => {
    state = data;
  };
  this.getCity = () => {
    return city;
  };
  this.setCity = (data) => {
    city = data;
  };
  this.getCep = () => {
    return cep;
  };
  this.setCep = (data) => {
    cep = data;
  };
  this.getEmail = () => {
    return email;
  };
  this.setEmail = (data) => {
    email = data;
  };
  this.getResTel = () => {
    return resTel;
  };
  this.setResTel = (data) => {
    resTel = data;
  };
  this.getCommercialTel = () => {
    return commercialTel;
  };
  this.setCommercialTel = (data) => {
    commercialTel = data;
  };
  this.getCelPhone = () => {
    return celPhone;
  };
  this.setCelPhone = (data) => {
    celPhone = data;
  };
  this.getFamilyHistory = () => {
    return familyHistory;
  };
  this.setFamilyHistory = (data) => {
    familyHistory = data !== undefined ? data.toString() : undefined;
  };
  this.getProblemDescription = () => {
    return problemDescription;
  };
  this.setProblemDescription = (data) => {
    problemDescription = data;
  };
  this.getPatientHealthProblem = () => {
    return patientHealthProblem;
  };
  this.setPatientHealthProblem = (data) => {
    patientHealthProblem = data !== undefined ? data.toString() : undefined;
  };
  this.getHealthProblemDescription = () => {
    return healthProblemDescription;
  };
  this.setHealthProblemDescription = (data) => {
    healthProblemDescription = data;
  };

  this.genreToText = () => {
      switch (genre) {
          case "1":
              return "Masculino";
          case "2":
              return "Feminino";
          default:
              return "Não informado"
      }
  };
  this.familyHistoryToText = () => {
      switch (familyHistory) {
          case "1":
              return "Não (0)";
          case "2":
              return "Sim (1)";
          default:
              return "Não respondida"
      }
  };
  this.patientHealthProblemToText = () => {
      switch (patientHealthProblem) {
          case "1":
              return "Não";
          case "2":
              return "Sim";
          default:
              return "Não respondida"
      }
  };
  this.birthDateToText = () => {
      return dateToText(birthDate);
  };
  this.updateClinicalHistoryPoints = (indexAssessment) => {
      let points = 0;
      switch (familyHistory) {
          case "1":
               break;
          case "2":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getBreastfeedingTime()) {
          case "1":
              break;
          case "2":
              points = points + 2;
              break;
      }
      switch (this.assessments[indexAssessment].getBreastfeedingTiredness()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getBreastfeedingSleep()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getReleasingNipple()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getBiteNipple()) {
          case "1":
              break;
          case "2":
              points = points + 2;
              break;
      }
    this.assessments[indexAssessment].setClinicalHistoryPoints(points);
  };
  this.updateOneToThreeQuestionsPoints = (indexAssessment) => {
      let points = 0;
      switch (this.assessments[indexAssessment].getQuestionOne()) {
          case "1":
              break;
          case "2":
              points++;
              break;
          case "3":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getQuestionTwo()) {
          case "1":
              break;
          case "2":
              break;
          case "3":
              points = points + 2;
              break;
          case "4":
              points = points + 2;
              break;
      }
      switch (this.assessments[indexAssessment].getQuestionThree()) {
          case "1":
              break;
          case "2":
              points = points + 2;
              break;
          case "3":
              points = points + 3;
              break;
      }
    this.assessments[indexAssessment].setQuestionsOneToThreePoints(points);
  };
  this.updateFourQuestionPoints = (indexAssessment) => {
      let points = 0;
      switch (this.assessments[indexAssessment].getQuestionFourOne()) {
          case "1":
              break;
          case "2":
              points = points + 2;
              break;
      }
      switch (this.assessments[indexAssessment].getQuestionFourTwo()) {
          case "1":
              break;
          case "2":
              points = points + 2;
              break;
          case "3":
              points = points + 3;
              break;
      }
      switch (this.assessments[indexAssessment].getQuestionFourThree()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
      this.assessments[indexAssessment].setQuestionFourPoints(points);
  };
  this.updateQuestionOneToFourPoints = (indexAssessment) => {
    this.updateOneToThreeQuestionsPoints(indexAssessment);
    this.updateFourQuestionPoints(indexAssessment);
    let target = this.assessments[indexAssessment];
    target.setQuestionsOneToFourPoints(target.getQuestionsOneToThreePoints() + target.getQuestionFourPoints());
  };
  this.updatePartTwoQuestionPoints = (indexAssessment) => {
      let points = 0;
      switch (this.assessments[indexAssessment].getPartTwoQuestionOne()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getPartTwoQuestionTwoOne()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getPartTwoQuestionTwoTwo()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getPartTwoQuestionTwoThree()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
      switch (this.assessments[indexAssessment].getPartTwoQuestionTwoFour()) {
          case "1":
              break;
          case "2":
              points++;
              break;
      }
    this.assessments[indexAssessment].setPartTwoQuestionPoints(points);
  };
  this.updateClinicalAssessmentPoints = (indexAssessment) => {
    this.updateQuestionOneToFourPoints(indexAssessment);
    this.updatePartTwoQuestionPoints(indexAssessment);
    let target = this.assessments[indexAssessment];
    target.setClinicalAssessmentPoints(target.getQuestionsOneToFourPoints() + target.getPartTwoQuestionPoints());
  };
  this.updateHistoryAssessmentPoints =(indexAssessment) => {
    this.updateClinicalHistoryPoints(indexAssessment);
    this.updateClinicalAssessmentPoints(indexAssessment);
    let target = this.assessments[indexAssessment];
    target.setHistoryAssessmentPoints(target.getClinicalHistoryPoints() + target.getClinicalAssessmentPoints());
  };

  this.toJSON = (indexAssessment) => {
    let patientJSON = {};
    patientJSON.patientId = patientId;
    patientJSON.name = name;
    patientJSON.birthDate = birthDate;
    patientJSON.genre = genre;
    patientJSON.motherName = motherName;
    patientJSON.motherCPF = motherCPF;
    patientJSON.fatherName = fatherName;
    patientJSON.address = address;
    patientJSON.residenceNumber = residenceNumber;
    patientJSON.neighborhood = neighborhood;
    patientJSON.state = state;
    patientJSON.city = city;
    patientJSON.cep = cep;
    patientJSON.email = email;
    patientJSON.resTel = resTel;
    patientJSON.commercialTel = commercialTel;
    patientJSON.celPhone = celPhone;
    patientJSON.familyHistory = familyHistory;
    patientJSON.problemDescription = problemDescription;
    patientJSON.patientHealthProblem = patientHealthProblem;
    patientJSON.healthProblemDescription = healthProblemDescription;
    patientJSON.assessments = [];

    let assessmentJSON = {};
    //Início do Exame
    assessmentJSON.assessmentId = this.assessments[indexAssessment].getAssessmentId();
    assessmentJSON.assessmentDate = this.assessments[indexAssessment].getAssessmentDate();
    assessmentJSON.breastfeeding = this.assessments[indexAssessment].getBreastfeeding();
    assessmentJSON.breastfeedingTime = this.assessments[indexAssessment].getBreastfeedingTime();
    assessmentJSON.breastfeedingTiredness = this.assessments[indexAssessment].getBreastfeedingTiredness();
    assessmentJSON.breastfeedingSleep = this.assessments[indexAssessment].getBreastfeedingSleep();
    assessmentJSON.releasingNipple = this.assessments[indexAssessment].getReleasingNipple();
    assessmentJSON.biteNipple = this.assessments[indexAssessment].getBiteNipple();
    assessmentJSON.obsBreastfeeding = this.assessments[indexAssessment].getObsBreastfeeding();
    //Pontos História Clínica
    assessmentJSON.clinicalHistoryPoints = this.assessments[indexAssessment].getClinicalHistoryPoints();
    //Tela 02
    assessmentJSON.questionOne = this.assessments[indexAssessment].getQuestionOne();
    assessmentJSON.questionTwo = this.assessments[indexAssessment].getQuestionTwo();
    assessmentJSON.questionThree = this.assessments[indexAssessment].getQuestionThree();
    //Pontos Questões de Um a Três
    assessmentJSON.questionsOneToThreePoints = this.assessments[indexAssessment].getQuestionsOneToThreePoints();
    //Tela 03
    assessmentJSON.questionFour = this.assessments[indexAssessment].getQuestionFour();
    assessmentJSON.questionFourOne = this.assessments[indexAssessment].getQuestionFourOne();
    assessmentJSON.questionFourTwo = this.assessments[indexAssessment].getQuestionFourTwo();
    assessmentJSON.questionFourThree = this.assessments[indexAssessment].getQuestionFourThree();
    assessmentJSON.questionFourComments = this.assessments[indexAssessment].getQuestionFourComments();
    //Pontos Questão 4
    assessmentJSON.questionFourPoints = this.assessments[indexAssessment].getQuestionFourPoints();
    //Pontos da Parte I
    assessmentJSON.questionsOneToFourPoints = this.assessments[indexAssessment].getQuestionsOneToFourPoints();
    //Tela 04
    assessmentJSON.partTwoQuestionOne = this.assessments[indexAssessment].getPartTwoQuestionOne();
    assessmentJSON.partTwoQuestionTwoOne = this.assessments[indexAssessment].getPartTwoQuestionTwoOne();
    assessmentJSON.partTwoQuestionTwoTwo = this.assessments[indexAssessment].getPartTwoQuestionTwoTwo();
    assessmentJSON.partTwoQuestionTwoThree = this.assessments[indexAssessment].getPartTwoQuestionTwoThree();
    assessmentJSON.partTwoQuestionTwoFour = this.assessments[indexAssessment].getPartTwoQuestionTwoFour();
    assessmentJSON.obsSuction = this.assessments[indexAssessment].getObsSuction();
    //Pontos da Parte II
    assessmentJSON.partTwoQuestionPoints = this.assessments[indexAssessment].getPartTwoQuestionPoints();
    //Pontos Totais Exame Clínico
    assessmentJSON.clinicalAssessmentPoints = this.assessments[indexAssessment].getClinicalAssessmentPoints();
    //Pontos Totais do Exame
    assessmentJSON.historyAssessmentPoints = this.assessments[indexAssessment].getHistoryAssessmentPoints();
    //Tela 05
    assessmentJSON.obsResume = this.assessments[indexAssessment].getObsResume();
    assessmentJSON.assBehavior = this.assessments[indexAssessment].getAssBehavior();
    assessmentJSON.descBehavior = this.assessments[indexAssessment].getDescBehavior();
    //Usuário
    assessmentJSON.userCPF = this.assessments[indexAssessment].getUserCPF();
    assessmentJSON.userName = this.assessments[indexAssessment].getUserName();
    assessmentJSON.userLastName = this.assessments[indexAssessment].getUserLastName();
    assessmentJSON.userOccupation = this.assessments[indexAssessment].getUserOccupation();
    assessmentJSON.userRegistry = this.assessments[indexAssessment].getUserRegistry();

    patientJSON.assessments.push(assessmentJSON);
    console.log(patientJSON);

    return JSON.stringify(patientJSON);
  };
};