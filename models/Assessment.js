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
  //Tela 02
  questionOne: Number,
  questionTwo: Number,
  questionThree: Number,
  //Tela 03
  questionFour: Number,
  questionFourOne: Number,
  questionFourTwo: Number,
  questionFourThree: Number,
  questionFourComments: String,
  //Tela 04
  partTwoQuestionOne: Number,
  partTwoQuestionTwoOne: Number,
  partTwoQuestionTwoTwo: Number,
  partTwoQuestionTwoThree: Number,
  partTwoQuestionTwoFour: Number,
  obsSuction: String,
  //Tela 05
  obsResume: String,
  behavior: Number,
  descBehavior: String,
  //Usuário
  userCPF: String,
  userName:  String,
  userLastName: String,
  userOccupation: String,
  userRegistry: String
});

module.exports = mongoose.model('Assessment', assessmentSchema);