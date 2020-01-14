const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  assessmentDate: { type: Date, default: Date.now },
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

module.exports = mongoose.model('Assessment', assessmentSchema);