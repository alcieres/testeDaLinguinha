
function Patient (
  patientId,
  //Tela 01
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
  //Início do Exame
  assessmentId,
  assessmentDate,
  breastfeeding,
  breastfeedingTime,
  breastfeedingTiredness,
  breastfeedingSleep,
  releasingNipple,
  biteNipple,
  obsBreastfeeding,
  //Tela 02
  questionOne,
  questionTwo,
  questionThree,
  //Tela 03
  questionFour,
  questionFourOne,
  questionFourTwo,
  questionFourThree,
  questionFourComments,
  //Tela 04
  partTwoQuestionOne,
  partTwoQuestionTwoOne,
  partTwoQuestionTwoTwo,
  partTwoQuestionTwoThree,
  partTwoQuestionTwoFour,
  obsSuction,
  //Tela 05
  obsResume,
  behavior,
  descBehavior,
  //Usuário
  userCPF,
  userName,
  userLastName,
  userOccupation,
  userRegistry
) {
  this.patientId = patientId;
  this.name = name;
  this.birthDate = birthDate;
  this.genre = genre !== undefined ? genre.toString() : undefined;
  this.motherName = motherName;
  this.motherCPF = motherCPF;
  this.fatherName = fatherName;
  this.address = address;
  this.residenceNumber = residenceNumber;
  this.neighborhood = neighborhood;
  this.state = state;
  this.city = city;
  this.cep = cep;
  this.email = email;
  this.resTel = resTel;
  this.commercialTel = commercialTel;
  this.celPhone = celPhone;
  this.familyHistory = familyHistory !== undefined ? familyHistory.toString() : undefined;
  this.problemDescription = problemDescription;
  this.patientHealthProblem = patientHealthProblem !== undefined ? patientHealthProblem.toString() : undefined;
  this.healthProblemDescription = healthProblemDescription;
  this.assessment = [{
    assessmentId: assessmentId,
    assessmentDate: assessmentDate,
    breastfeeding: breastfeeding !== undefined ? breastfeeding.toString() : undefined,
    breastfeedingTime: breastfeedingTime !== undefined ? breastfeedingTime.toString() : undefined,
    breastfeedingTiredness: breastfeedingTiredness !== undefined ? breastfeedingTiredness.toString() : undefined,
    breastfeedingSleep: breastfeedingSleep !== undefined ? breastfeedingSleep.toString() : undefined,
    releasingNipple: releasingNipple !== undefined ? releasingNipple.toString() : undefined,
    biteNipple: biteNipple !== undefined ? biteNipple.toString() : undefined,
    obsBreastfeeding: obsBreastfeeding,
      //Tela 02
    questionOne: questionOne !== undefined ? questionOne.toString() : undefined,
    questionTwo: questionTwo !== undefined ? questionTwo.toString() : undefined,
    questionThree: questionThree !== undefined ? questionThree.toString() : undefined,
    //Tela 03
    questionFour: questionFour !== undefined ? questionFour.toString() : undefined,
    questionFourOne: questionFourOne !== undefined ? questionFourOne.toString() : undefined,
    questionFourTwo: questionFourTwo !== undefined ? questionFourTwo.toString() : undefined,
    questionFourThree: questionFourThree !== undefined ? questionFourThree.toString() : undefined,
    questionFourComments: questionFourComments !== undefined ? questionFourComments.toString() : undefined,
    //Tela 04
    partTwoQuestionOne: partTwoQuestionOne !== undefined ? partTwoQuestionOne.toString() : undefined,
    partTwoQuestionTwoOne: partTwoQuestionTwoOne !== undefined ? partTwoQuestionTwoOne.toString() : undefined,
    partTwoQuestionTwoTwo: partTwoQuestionTwoTwo !== undefined ? partTwoQuestionTwoTwo.toString() : undefined,
    partTwoQuestionTwoThree: partTwoQuestionTwoThree !== undefined ? partTwoQuestionTwoThree.toString() : undefined,
    partTwoQuestionTwoFour: partTwoQuestionTwoFour !== undefined ? partTwoQuestionTwoFour.toString() : undefined,
    obsSuction: obsSuction,
    //Tela 05
    obsResume: obsResume,
    behavior: behavior !== undefined ? behavior.toString() : undefined,
    descBehavior: descBehavior,
    //Usuário
    userCPF: userCPF,
    userName:  userName,
    userLastName: userLastName,
    userOccupation: userOccupation,
    userRegistry: userRegistry
    }];
    this.genreToText = () => {
        switch (this.genre) {
            case "1":
                return "Masculino";
            case "2":
                return "Feminino";
            default:
                return "Não informado"
        }
    };
    this.familyHistoryToText = () => {
        switch (this.familyHistory) {
            case "1":
                return "Não (0)";
            case "2":
                return "Sim (1)";
            default:
                return "Não respondida"
        }
    };
    this.patientHealthProblemToText = () => {
        switch (this.patientHealthProblem) {
            case "1":
                return "Não";
            case "2":
                return "Sim";
            default:
                return "Não respondida"
        }
    };
    this.breastfeedingToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].breastfeeding) {
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
    this.breastfeedingTimeToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].breastfeedingTime) {
            case "1":
                return "2h ou mais (0)";
            case "2":
                return "1h ou menos (2)";
            default:
                return "Não respondida"
        }
    };
    this.breastfeedingTirednessToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].breastfeedingTiredness) {
            case "1":
                return "Não (0)";
            case "2":
                return "Sim (1)";
            default:
                return "Não respondida"
        }
    };
    this.breastfeedingSleepToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].breastfeedingSleep) {
            case "1":
                return "Não (0)";
            case "2":
                return "Sim (1)";
            default:
                return "Não respondida"
        }
    };
    this.releasingNippleToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].releasingNipple) {
            case "1":
                return "Não (0)";
            case "2":
                return "Sim (1)";
            default:
                return "Não respondida"
        }
    };
    this.biteNippleToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].biteNipple) {
            case "1":
                return "Não (0)";
            case "2":
                return "Sim (2)";
            default:
                return "Não respondida"
        }
    };
    this.questionOneToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].questionOne) {
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
    this.questionTwoToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].questionTwo) {
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
    this.questionThreeToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].questionThree) {
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
    this.questionFourToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].questionFour) {
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
    this.questionFourOneToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].questionFourOne) {
            case "1":
                return "Delgado (0)";
            case "2":
                return "Espesso (2)";
            default:
                return "Não respondida"
        }
    };
    this.questionFourTwoToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].questionFourTwo) {
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
    this.questionFourThreeToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].questionFourThree) {
            case "1":
                return "Visível a partir das carúnculas sublinguais (0)";
            case "2":
                return "Visível a partir da crista alveolar inferior (1)";
            default:
                return "Não respondida"
        }
    };
    this.partTwoQuestionOneToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].partTwoQuestionOne) {
            case "1":
                return "Adequado: protusão de língua, movimentos coordenados e sucção eficiente (0)";
            case "2":
                return "Inadequado: protusão de língua limitada, movimentos incoordenados e atraso para início da sucção (1)";
            default:
                return "Não respondida"
        }
    };
    this.partTwoQuestionTwoOneToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].partTwoQuestionTwoOne) {
            case "1":
                return "Várias sucções seguidas com pausas curtas (0)";
            case "2":
                return "Poucas sucções com pausas longas (1)";
            default:
                return "Não respondida"
        }
    };
    this.partTwoQuestionTwoTwoToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].partTwoQuestionTwoTwo) {
            case "1":
                return "Adequada (0)";
            case "2":
                return "Inadequada (1)";
            default:
                return "Não respondida"
        }
    };
    this.partTwoQuestionTwoThreeToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].partTwoQuestionTwoThree) {
            case "1":
                return "Não (0)";
            case "2":
                return "Sim (1)";
            default:
                return "Não respondida"
        }
    };
    this.partTwoQuestionTwoFourToText = (indexAssessment) => {
        switch (this.assessment[indexAssessment].partTwoQuestionTwoFour) {
            case "1":
                return "Não (0)";
            case "2":
                return "Sim (1)";
            default:
                return "Não respondida"
        }
    };
    this.assessmentDateToText = (indexAssessment) => {
        return dateToText(this.assessment[indexAssessment].assessmentDate);
    };
    this.birthDateToText = () => {
        return dateToText(this.birthDate);
    };
    this.behaviorText = (indexAssessment) => {
      switch (this.assessment[indexAssessment].behavior) {
        case "1":
          return "Não apresenta alteração de frênulo lingual";
        case "2":
          return "Frenotomia sugerida";
        case "3":
          return "Retornar para monitoramento em:";
        default:
          return "Não respondida"
      }
    };
    this.ClinicalHistoryPoints = (indexAssessment) => {
        let points = 0;
        switch (this.familyHistory) {
            case "1":
                 break;
            case "2":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].breastfeedingTime) {
            case "1":
                break;
            case "2":
                points = points + 2;
                break;
        }
        switch (this.assessment[indexAssessment].breastfeedingTiredness) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].breastfeedingSleep) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].releasingNipple) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].biteNipple) {
            case "1":
                break;
            case "2":
                points = points + 2;
                break;
        }
        return points;
    };
    this.oneToThreeQuestionsPoints = (indexAssessment) => {
        let points = 0;
        switch (this.assessment[indexAssessment].questionOne) {
            case "1":
                break;
            case "2":
                points++;
                break;
            case "3":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].questionTwo) {
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
        switch (this.assessment[indexAssessment].questionThree) {
            case "1":
                break;
            case "2":
                points = points + 2;
                break;
            case "3":
                points = points + 3;
                break;
        }
        return points;
    };
    this.fourQuestionPoints = (indexAssessment) => {
        let points = 0;
        switch (this.assessment[indexAssessment].questionFourOne) {
            case "1":
                break;
            case "2":
                points = points + 2;
                break;
        }
        switch (this.assessment[indexAssessment].questionFourTwo) {
            case "1":
                break;
            case "2":
                points = points + 2;
                break;
            case "3":
                points = points + 3;
                break;
        }
        switch (this.assessment[indexAssessment].questionFourThree) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        return points;
    };
    this.partTwoQuestionPoints = (indexAssessment) => {
        let points = 0;
        switch (this.assessment[indexAssessment].partTwoQuestionOne) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].partTwoQuestionTwoOne) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].partTwoQuestionTwoTwo) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].partTwoQuestionTwoThree) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        switch (this.assessment[indexAssessment].partTwoQuestionTwoFour) {
            case "1":
                break;
            case "2":
                points++;
                break;
        }
        return points;
    }
  }

function dateToText(date) {
    let day = date.getDate().toString();
    let month = date.getMonth() + 1 + "";
    let year = date.getFullYear();
    if (day.length < 2){
        day = 0  + "" + day;
    }
    if (month.length < 2){
        month = 0 + "" + month;
    }
    return day + "/" + month + '/' + year;
}


patientTest = new Patient (
    '',
    //Tela 01
    "Mia Clara Bagatim Cardoso",
    (new Date(2019, 7, 9)),
    "2",
    "Isabel Simone Tatiane",
    "99988877755",
    "Renato Sérgio Moreira",
    "Rua Professor José Maia Filho",
    "408",
    "Glória",
    "RS",
    "Osório",
    "95520000",
    "renatosergiomoreira@mktec.com.br",
    "5136631234",
    "5136634321",
    "51998986632",
    //Início do Exame
    "1",
    "problemDescription",
    "1",
    "healthProblemDescription",
    '',
    new Date(2019, 7, 20),
    "2",
    "1",
    "1",
    "2",
    "2",
    "1",
    "Mama muito bem",
    //Tela 02
    "2",
    "1",
    "1",
    //Tela 03
    "1",
    "1",
    "1",
    "2",
    //Tela 04
    "1",
    "2",
    "1",
    "1",
    "2",
    "Sem problemas aparentes",
    //Tela 05
    "obsResume",
    "1",
    "descBehavior",
    "",
    //Usuário
    "",
    "",
    "",
    "",
    ""
);
