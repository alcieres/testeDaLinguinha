const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  assessmentDate: Date,
  breastfeeding: Number,
  breastfeedingTime: Number,
  breastfeedingTiredness: Number,
  breastfeedingSleep: Number,
  releasingNipple: Number,
  biteNipple: Number,
  obsBreastfeeding: String,
  //Pontos História Clínica
  clinicalHistoryPoints: Number,
  //Tela 02
  questionOne: Number,
  questionTwo: Number,
  questionThree: Number,
  //Pontos Questões de Um a Três
  questionsOneToThreePoints: Number,
  //Tela 03
  questionFour: Number,
  questionFourOne: Number,
  questionFourTwo: Number,
  questionFourThree: Number,
  questionFourComments: String,
  //Pontos Questão 4
  questionFourPoints: Number,
  //Pontos da Parte I
  questionsOneToFourPoints: Number,
  //Tela 04
  partTwoQuestionOne: Number,
  partTwoQuestionTwoOne: Number,
  partTwoQuestionTwoTwo: Number,
  partTwoQuestionTwoThree: Number,
  partTwoQuestionTwoFour: Number,
  obsSuction: String,
  //Pontos da Parte II
  partTwoQuestionPoints: Number,
  //Pontos Totais Exame Clínico
  clinicalAssessmentPoints: Number,
  //Pontos Totais do Exame
  historyAssessmentPoints: Number,
  //Tela 05
  obsResume: String,
  assBehavior: Number,
  descBehavior: String,
  //Usuário
  userCPF: String,
  userName:  String,
  userLastName: String,
  userOccupation: String,
  userRegistry: String,
  //Status
  completed: Boolean
});

/*
Função para preencher dados de um exame
Recebe a requisição e o tipo.
o tipo pode ser:
- 1: Criar novo exame sem id (não recebe o "_id");
- 2: Editar exame (atualiza do "_id").
*/

assessmentSchema.methods.reqCreateNewAssessment = function (req, type) {
  let assessmentIndex =  0;
  //Início do Exame
  if (type == 2){
      this._id = req.body.assessments[assessmentIndex].assessmentId;
  }
  this.assessmentDate = req.body.assessments[assessmentIndex].assessmentDate;
  this.breastfeeding = req.body.assessments[assessmentIndex].breastfeeding;
  this.breastfeedingTime = req.body.assessments[assessmentIndex].breastfeedingTime;
  this.breastfeedingTiredness = req.body.assessments[assessmentIndex].breastfeedingTiredness;
  this.breastfeedingSleep = req.body.assessments[assessmentIndex].breastfeedingSleep;
  this.releasingNipple = req.body.assessments[assessmentIndex].releasingNipple;
  this.biteNipple = req.body.assessments[assessmentIndex].biteNipple;
  this.obsBreastfeeding = req.body.assessments[assessmentIndex].obsBreastfeeding;
  //Pontos História Clínica
  this.clinicalHistoryPoints = req.body.assessments[assessmentIndex].clinicalHistoryPoints;
  //Tela 02
  this.questionOne = req.body.assessments[assessmentIndex].questionOne;
  this.questionTwo = req.body.assessments[assessmentIndex].questionTwo;
  this.questionThree = req.body.assessments[assessmentIndex].questionThree;
  //Pontos Questões de Um a Três
  this.questionsOneToThreePoints = req.body.assessments[assessmentIndex].questionsOneToThreePoints;
  //Tela 03
  this.questionFour = req.body.assessments[assessmentIndex].questionFour;
  this.questionFourOne = req.body.assessments[assessmentIndex].questionFourOne;
  this.questionFourTwo = req.body.assessments[assessmentIndex].questionFourTwo;
  this.questionFourThree = req.body.assessments[assessmentIndex].questionFourThree;
  this.questionFourComments = req.body.assessments[assessmentIndex].questionFourComments;
  //Pontos Questão 4
  this.questionFourPoints = req.body.assessments[assessmentIndex].questionFourPoints;
  //Pontos da Parte I
  this.questionsOneToFourPoints = req.body.assessments[assessmentIndex].questionsOneToFourPoints;
  //Tela 04
  this.partTwoQuestionOne = req.body.assessments[assessmentIndex].partTwoQuestionOne;
  this.partTwoQuestionTwoOne = req.body.assessments[assessmentIndex].partTwoQuestionTwoOne;
  this.partTwoQuestionTwoTwo = req.body.assessments[assessmentIndex].partTwoQuestionTwoTwo;
  this.partTwoQuestionTwoThree = req.body.assessments[assessmentIndex].partTwoQuestionTwoThree;
  this.partTwoQuestionTwoFour = req.body.assessments[assessmentIndex].partTwoQuestionTwoFour;
  this.obsSuction = req.body.assessments[assessmentIndex].obsSuction;
  //Pontos da Parte II
  this.partTwoQuestionPoints = req.body.assessments[assessmentIndex].partTwoQuestionPoints;
  //Pontos Totais Exame Clínico
  this.clinicalAssessmentPoints = req.body.assessments[assessmentIndex].clinicalAssessmentPoints;
  //Pontos Totais do Exame
  this.historyAssessmentPoints = req.body.assessments[assessmentIndex].historyAssessmentPoints;
  //Tela 05
  this.obsResume = req.body.assessments[assessmentIndex].obsResume;
  this.assBehavior = req.body.assessments[assessmentIndex].assBehavior;
  this.descBehavior = req.body.assessments[assessmentIndex].descBehavior;
  //Usuário
  this.userCPF = req.user.cpf;
  this.userName = req.user.name;
  this.userLastName = req.user.lastName;
  this.userOccupation = req.user.occupation;
  this.userRegistry = req.user.registry;
};

module.exports = mongoose.model('Assessment', assessmentSchema);