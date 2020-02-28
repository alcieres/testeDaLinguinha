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
    return {
      patientId,
      name,
      birthDate,
      genre,
      motherName,
      motherCPF,
      fatherName,
      address,
      residenceNumber,
      neighborhood,
      state,
      city,
      cep,
      email,
      resTel,
      commercialTel,
      celPhone,
      familyHistory,
      problemDescription,
      patientHealthProblem,
      healthProblemDescription,
      assessments: [{
        //Início do Exame
        assessmentId: this.assessments[indexAssessment].getAssessmentId(),
        assessmentDate: this.assessments[indexAssessment].getAssessmentDate(),
        breastfeeding: this.assessments[indexAssessment].getBreastfeeding(),
        breastfeedingTime: this.assessments[indexAssessment].getBreastfeedingTime(),
        breastfeedingTiredness: this.assessments[indexAssessment].getBreastfeedingTiredness(),
        breastfeedingSleep: this.assessments[indexAssessment].getBreastfeedingSleep(),
        releasingNipple: this.assessments[indexAssessment].getReleasingNipple(),
        biteNipple: this.assessments[indexAssessment].getBiteNipple(),
        obsBreastfeeding: this.assessments[indexAssessment].getObsBreastfeeding(),
        //Pontos História Clínica
        clinicalHistoryPoints: this.assessments[indexAssessment].getClinicalHistoryPoints(),
        //Tela 02
        questionOne: this.assessments[indexAssessment].getQuestionOne(),
        questionTwo: this.assessments[indexAssessment].getQuestionTwo(),
        questionThree: this.assessments[indexAssessment].getQuestionThree(),
        //Pontos Questões de Um a Três
        questionsOneToThreePoints: this.assessments[indexAssessment].getQuestionsOneToThreePoints(),
        //Tela 03
        questionFour: this.assessments[indexAssessment].getQuestionFour(),
        questionFourOne: this.assessments[indexAssessment].getQuestionFourOne(),
        questionFourTwo: this.assessments[indexAssessment].getQuestionFourTwo(),
        questionFourThree: this.assessments[indexAssessment].getQuestionFourThree(),
        questionFourComments: this.assessments[indexAssessment].getQuestionFourComments(),
        //Pontos Questão 4
        questionFourPoints: this.assessments[indexAssessment].getQuestionFourPoints(),
        //Pontos da Parte I
        questionsOneToFourPoints: this.assessments[indexAssessment].getQuestionsOneToFourPoints(),
        //Tela 04
        partTwoQuestionOne: this.assessments[indexAssessment].getPartTwoQuestionOne(),
        partTwoQuestionTwoOne: this.assessments[indexAssessment].getPartTwoQuestionTwoOne(),
        partTwoQuestionTwoTwo: this.assessments[indexAssessment].getPartTwoQuestionTwoTwo(),
        partTwoQuestionTwoThree: this.assessments[indexAssessment].getPartTwoQuestionTwoThree(),
        partTwoQuestionTwoFour: this.assessments[indexAssessment].getPartTwoQuestionTwoFour(),
        obsSuction: this.assessments[indexAssessment].getObsSuction(),
        //Pontos da Parte II
        partTwoQuestionPoints: this.assessments[indexAssessment].getPartTwoQuestionPoints(),
        //Pontos Totais Exame Clínico
        clinicalAssessmentPoints: this.assessments[indexAssessment].getClinicalAssessmentPoints(),
        //Pontos Totais do Exame
        historyAssessmentPoints: this.assessments[indexAssessment].getHistoryAssessmentPoints(),
        //Tela 05
        obsResume: this.assessments[indexAssessment].getObsResume(),
        assBehavior: this.assessments[indexAssessment].getAssBehavior(),
        descBehavior: this.assessments[indexAssessment].getDescBehavior(),
        //Usuário
        userCPF: this.assessments[indexAssessment].getUserCPF(),
        userName: this.assessments[indexAssessment].getUserName(),
        userLastName: this.assessments[indexAssessment].getUserLastName(),
        userOccupation: this.assessments[indexAssessment].getUserOccupation(),
        userRegistry: this.assessments[indexAssessment].getUserRegistry()
      }]
    }
  };

};