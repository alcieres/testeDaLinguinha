function Assessment (){
  //Início do Exame
  let assessmentId;
  let assessmentDate;
  let breastfeeding;
  let breastfeedingTime;
  let breastfeedingTiredness;
  let breastfeedingSleep;
  let releasingNipple;
  let biteNipple;
  let obsBreastfeeding;
  //Pontos História Clínica
  let clinicalHistoryPoints;
  //Tela 02
  let questionOne;
  let questionTwo;
  let questionThree;
  //Pontos Questões de Um a Três
  let questionsOneToThreePoints;
  //Tela 03
  let questionFour;
  let questionFourOne;
  let questionFourTwo;
  let questionFourThree;
  let questionFourComments;
  //Pontos Questão 4
  let questionFourPoints;
  //Pontos da Parte I
  let questionsOneToFourPoints;
  //Tela 04
  let partTwoQuestionOne;
  let partTwoQuestionTwoOne;
  let partTwoQuestionTwoTwo;
  let partTwoQuestionTwoThree;
  let partTwoQuestionTwoFour;
  let obsSuction;
  //Pontos da Parte II
  let partTwoQuestionPoints;
  //Pontos Totais Exame Clínico
  let clinicalAssessmentPoints;
  //Pontos Totais do Exame
  let historyAssessmentPoints;
  //Tela 05
  let obsResume;
  let assBehavior;
  let descBehavior;
  //Usuário
  let userCPF;
  let userName;
  let userLastName;
  let userOccupation;
  let userRegistry;

  this.getAssessmentId = () => {
    return assessmentId;
  };
  this.setAssessmentId = (id) => {
      assessmentId = id;
  };
  this.getAssessmentDate = () => {
    return assessmentDate;
  };
  this.setAssessmentDate = (date) => {
    assessmentDate = date;
  };
  this.getBreastfeeding = () => {
    return breastfeeding;
  };
  this.setBreastfeeding = (data) => {
    breastfeeding = data !== undefined ? data.toString() : undefined;
  };
  this.getBreastfeedingTime = () => {
    return breastfeedingTime;
  };
  this.setBreastfeedingTime = (data) => {
    breastfeedingTime = data !== undefined ? data.toString() : undefined;
  };
  this.getBreastfeedingTiredness = () => {
    return breastfeedingTiredness;
  };
  this.setBreastfeedingTiredness = (data) => {
    breastfeedingTiredness = data !== undefined ? data.toString() : undefined;
  };
  this.getBreastfeedingSleep = () => {
    return breastfeedingSleep;
  };
  this.setBreastfeedingSleep = (data) => {
    breastfeedingSleep = data !== undefined ? data.toString() : undefined;
  };
  this.getReleasingNipple = () => {
    return releasingNipple;
  };
  this.setReleasingNipple = (data) => {
    releasingNipple = data !== undefined ? data.toString() : undefined;
  };
  this.getBiteNipple = () => {
    return biteNipple;
  };
  this.setBiteNipple = (data) => {
    biteNipple = data !== undefined ? data.toString() : undefined;
  };
  this.getObsBreastfeeding = () => {
    return obsBreastfeeding;
  };
  this.setObsBreastfeeding = (data) => {
    obsBreastfeeding = data;
  };
  //Pontos História Clínica
  this.getClinicalHistoryPoints = () => {
    return clinicalHistoryPoints;
  };
  this.setClinicalHistoryPoints = (data) => {
    clinicalHistoryPoints = data;
  };
  //Tela 02
  this.getQuestionOne = () => {
    return questionOne;
  };
  this.setQuestionOne = (data) => {
    questionOne = data !== undefined ? data.toString() : undefined;
  };
  this.getQuestionTwo = () => {
    return questionTwo;
  };
  this.setQuestionTwo = (data) => {
    questionTwo = data !== undefined ? data.toString() : undefined;
  };
  this.getQuestionThree = () => {
    return questionThree;
  };
  this.setQuestionThree = (data) => {
    questionThree = data !== undefined ? data.toString() : undefined;
  };
  //Pontos Questões de Um a Três
  this.getQuestionsOneToThreePoints = () => {
    return questionsOneToThreePoints;
  };
  this.setQuestionsOneToThreePoints = (data) => {
    questionsOneToThreePoints = data;
  };
  //Tela 03
  this.getQuestionFour = () => {
    return questionFour;
  };
  this.setQuestionFour = (data) => {
    questionFour = data !== undefined ? data.toString() : undefined;
  };
  this.getQuestionFourOne = () => {
    return questionFourOne;
  };
  this.setQuestionFourOne = (data) => {
    questionFourOne = data !== undefined ? data.toString() : undefined;
  };
  this.getQuestionFourTwo = () => {
    return questionFourTwo;
  };
  this.setQuestionFourTwo = (data) => {
    questionFourTwo = data !== undefined ? data.toString() : undefined;
  };
  this.getQuestionFourThree = () => {
    return questionFourThree;
  };
  this.setQuestionFourThree = (data) => {
    questionFourThree = data !== undefined ? data.toString() : undefined;
  };
  this.getQuestionFourComments = () => {
    return questionFourComments;
  };
  this.setQuestionFourComments = (data) => {
    questionFourComments = data;
  };
  //Pontos Questão 4
  this.getQuestionFourPoints = () => {
    return questionFourPoints;
  };
  this.setQuestionFourPoints = (data) => {
    questionFourPoints = data;
  };
  //Pontos da Parte I
  this.getQuestionsOneToFourPoints = () => {
    return questionsOneToFourPoints;
  };
  this.setQuestionsOneToFourPoints = (data) => {
    questionsOneToFourPoints = data;
  };
  //Tela 04
  this.getPartTwoQuestionOne = () => {
    return partTwoQuestionOne;
  };
  this.setPartTwoQuestionOne = (data) => {
    partTwoQuestionOne = data !== undefined ? data.toString() : undefined;
  };
  this.getPartTwoQuestionTwoOne = () => {
    return partTwoQuestionTwoOne;
  };
  this.setPartTwoQuestionTwoOne = (data) => {
    partTwoQuestionTwoOne = data !== undefined ? data.toString() : undefined;
  };
  this.getPartTwoQuestionTwoTwo = () => {
    return partTwoQuestionTwoTwo;
  };
  this.setPartTwoQuestionTwoTwo = (data) => {
    partTwoQuestionTwoTwo = data !== undefined ? data.toString() : undefined;
  };
  this.getPartTwoQuestionTwoThree = () => {
    return partTwoQuestionTwoThree;
  };
  this.setPartTwoQuestionTwoThree = (data) => {
    partTwoQuestionTwoThree = data !== undefined ? data.toString() : undefined;
  };
  this.getPartTwoQuestionTwoFour = () => {
    return partTwoQuestionTwoFour;
  };
  this.setPartTwoQuestionTwoFour = (data) => {
    partTwoQuestionTwoFour = data !== undefined ? data.toString() : undefined;
  };
  this.getObsSuction = () => {
    return obsSuction;
  };
  this.setObsSuction = (data) => {
    obsSuction = data;
  };
  //Pontos da Parte II
  this.getPartTwoQuestionPoints = () => {
    return partTwoQuestionPoints;
  };
  this.setPartTwoQuestionPoints = (data) => {
    partTwoQuestionPoints = data;
  };
  //Pontos Totais Exame Clínico
  this.getClinicalAssessmentPoints = () => {
    return clinicalAssessmentPoints;
  };
  this.setClinicalAssessmentPoints = (data) => {
    clinicalAssessmentPoints = data;
  };
  //Pontos Totais do Exame
  this.getHistoryAssessmentPoints = () => {
    return historyAssessmentPoints;
  };
  this.setHistoryAssessmentPoints = (data) => {
    historyAssessmentPoints = data;
  };
  //Tela 05
  this.getObsResume = () => {
    return obsResume;
  };
  this.setObsResume = (data) => {
    obsResume = data;
  };
  this.getAssBehavior = () => {
    return assBehavior;
  };
  this.setAssBehavior = (data) => {
    assBehavior = data !== undefined ? data.toString() : undefined;
  };
  this.getDescBehavior = () => {
    return descBehavior;
  };
  this.setDescBehavior = (data) => {
    descBehavior = data;
  };
  //Usuário
  this.getUserCPF = () => {
    return userCPF;
  };
  this.setUserCPF = (data) => {
    userCPF = data;
  };
  this.getUserName = () => {
    return userName;
  };
  this.setUserName = (data) => {
    userName = data;
  };
  this.getUserLastName = () => {
    return userLastName;
  };
  this.setUserLastName = (data) => {
    userLastName = data;
  };
  this.getUserOccupation = () => {
    return userOccupation;
  };
  this.setUserOccupation = (data) => {
    userOccupation = data;
  };
  this.getUserRegistry = () => {
    return userRegistry;
  };
  this.setUserRegistry = (data) => {
    userRegistry = data;
  };

  this.assessmentDateToText = () => {
    return dateToText(assessmentDate);
  };
  this.breastfeedingToText = () => {
    switch (breastfeeding) {
      case "1":
        return "Aleitamento materno exclusivo";
      case "2":
        return "Aleitamento misto";
      case "3":
        return "Sem aleitamento materno";
      default:
        return "Não respondida"
    }
  };
  this.breastfeedingTimeToText = () => {
    switch (breastfeedingTime) {
      case "1":
        return "2h ou mais (0)";
      case "2":
        return "1h ou menos (2)";
      default:
        return "Não respondida"
    }
  };
  this.breastfeedingTirednessToText = () => {
    switch (breastfeedingTiredness) {
      case "1":
        return "Não (0)";
      case "2":
        return "Sim (1)";
      default:
        return "Não respondida"
    }
  };
  this.breastfeedingSleepToText = () => {
    switch (breastfeedingSleep) {
      case "1":
        return "Não (0)";
      case "2":
        return "Sim (1)";
      default:
        return "Não respondida"
    }
  };
  this.releasingNippleToText = () => {
    switch (releasingNipple) {
      case "1":
        return "Não (0)";
      case "2":
        return "Sim (1)";
      default:
        return "Não respondida"
    }
  };
  this.biteNippleToText = () => {
    switch (biteNipple) {
      case "1":
        return "Não (0)";
      case "2":
        return "Sim (2)";
      default:
        return "Não respondida"
    }
  };
  this.questionOneToText = () => {
    switch (questionOne) {
      case "1":
        return "Lábios fechados (0)";
      case "2":
        return "Lábios entreabertos (1)";
      case "3":
        return "Lábios abertos (1)";
      default:
        return "Não respondida"
    }
  };
  this.questionTwoToText = () => {
    switch (questionTwo) {
      case "1":
        return "Língua na linha média (0)";
      case "2":
        return "Língua elevada (0)";
      case "3":
        return "Língua na linha média com elevação nas laterais (2)";
      case "4":
        return "Língua baixa (2)";
      default:
        return "Não respondida"
    }
  };
  this.questionThreeToText = () => {
    switch (questionThree) {
      case "1":
        return "Arredondada (0)";
      case "2":
        return "Ligeira fenda no ápice (2)";
      case "3":
        return "Formato de coração (3)";
      default:
        return "Não respondida"
    }
  };
  this.questionFourToText = () => {
    switch (questionFour) {
      case "1":
        return "É possivel visualizar";
      case "2":
        return "Não é possivel visualizar";
      case "3":
        return "Visualizado com manobra*";
      default:
        return "Não respondida"
    }
  };
  this.questionFourOneToText = () => {
    switch (questionFourOne) {
      case "1":
        return "Delgado (0)";
      case "2":
        return "Espesso (2)";
      default:
        return "Não respondida"
    }
  };
  this.questionFourTwoToText = () => {
    switch (questionFourTwo) {
      case "1":
        return "No terço médio (0)";
      case "2":
        return "Entre o terço médio e o ápice (2)";
      case "3":
        return "No ápice (3)";
      default:
        return "Não respondida"
    }
  };
  this.questionFourThreeToText = () => {
    switch (questionFourThree) {
      case "1":
        return "Visível a partir das carúnculas sublinguais (0)";
      case "2":
        return "Visível a partir da crista alveolar inferior (1)";
      default:
        return "Não respondida"
    }
  };
  this.partTwoQuestionOneToText = () => {
    switch (partTwoQuestionOne) {
      case "1":
        return "Adequado: protusão de língua, movimentos coordenados e sucção eficiente (0)";
      case "2":
        return "Inadequado: protusão de língua limitada, movimentos incoordenados e atraso para início da sucção (1)";
      default:
        return "Não respondida"
    }
  };
  this.partTwoQuestionTwoOneToText = () => {
    switch (partTwoQuestionTwoOne) {
      case "1":
        return "Várias sucções seguidas com pausas curtas (0)";
      case "2":
        return "Poucas sucções com pausas longas (1)";
      default:
        return "Não respondida"
    }
  };
  this.partTwoQuestionTwoTwoToText = () => {
    switch (partTwoQuestionTwoTwo) {
      case "1":
        return "Adequada (0)";
      case "2":
        return "Inadequada (1)";
      default:
        return "Não respondida"
    }
  };
  this.partTwoQuestionTwoThreeToText = () => {
    switch (partTwoQuestionTwoThree) {
      case "1":
        return "Não (0)";
      case "2":
        return "Sim (1)";
      default:
        return "Não respondida"
    }
  };
  this.partTwoQuestionTwoFourToText = () => {
    switch (partTwoQuestionTwoFour) {
      case "1":
        return "Não (0)";
      case "2":
        return "Sim (1)";
      default:
        return "Não respondida"
    }
  };
  this.assBehaviorToText = () => {
    switch (assBehavior) {
      case "1":
        return "Não apresenta alteração de frênulo lingual";
      case "2":
        return "Frenotomia sugerida";
      case "3":
        return "Retornar para monitoramento conforme descrição abaixo";
      case "4":
        return "Alteração de frênulo lingual sem interferência na mobilidade da língua";
      default:
        return "Não respondida"
    }
  };
}