const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');
const util = require('util');

/* Página Inicial */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('modelo', { title: 'Teste da Linguinha', user: req.user });
});

router.get('/teste', isLoggedIn, function(req, res, next) {
  res.send("Teste");
});
//imprimir JSON
//console.log(util.inspect(req.user, false, null, true /* enable colors */))

testAss = () => {
///assessmentExtract?patientId=' + data.success[0].patientId + '&assessmentId=' + data.success[0].assessmentId;


};

req = {
  "body": {
    "_id": "5e5eaef7b74e09171b1c063d",
    "assessments": [
      {
        "_id": {
          "$oid": "5e5eaef7b74e09171b1c063c"
        },
        "assessmentDate": {
          "$date": "2019-05-30T00:00:00.000Z"
        },
        "breastfeeding": 2,
        "breastfeedingTime": 1,
        "breastfeedingTiredness": 2,
        "breastfeedingSleep": 1,
        "releasingNipple": 2,
        "biteNipple": 1,
        "obsBreastfeeding": "Mama muito bem",
        "clinicalHistoryPoints": 3,
        "questionOne": 2,
        "questionTwo": 2,
        "questionThree": 1,
        "questionsOneToThreePoints": 1,
        "questionFour": 1,
        "questionFourOne": 2,
        "questionFourTwo": 2,
        "questionFourThree": 1,
        "questionFourComments": "Língua normalmente normal",
        "questionFourPoints": 2,
        "questionsOneToFourPoints": 3,
        "partTwoQuestionOne": 1,
        "partTwoQuestionTwoOne": 1,
        "partTwoQuestionTwoTwo": 1,
        "partTwoQuestionTwoThree": 1,
        "partTwoQuestionTwoFour": 2,
        "obsSuction": "Mama muito bem de dia",
        "partTwoQuestionPoints": 2,
        "clinicalAssessmentPoints": 5,
        "historyAssessmentPoints": 8,
        "obsResume": "",
        "descBehavior": "",
        "userCPF": "64214818334",
        "userName": "Alcieres",
        "userLastName": "Cardoso da Silva",
        "userOccupation": "Servidor Público",
        "userRegistry": "1517882"
      }
    ],
    "name": "TEREZA ANDREA BARBOSA",
    "birthDate": {
      "$date": "2019-05-13T00:00:00.000Z"
    },
    "genre": "2",
    "motherName": "MAITE ELIANE",
    "motherCPF": "25307754000",
    "fatherName": "CALEB BERNARDO BARBOSA",
    "address": "RUA JULIO DE CASTILHOS",
    "residenceNumber": "711",
    "neighborhood": "CENTRO",
    "state": "RS",
    "city": "OSORIO",
    "cep": "95520000",
    "email": "terezaandreabarbosa@mpeventos.com.br",
    "resTel": "5137713891",
    "commercialTel": "",
    "celPhone": "51985475658",
    "familyHistory": 2,
    "problemDescription": "O pai teve língua presa",
    "patientHealthProblem": 1,
    "healthProblemDescription": "Criança muito saudável"
  },
  "user": {
    "_id": "5d8bdeba56abfb1e561eeed8",
    "cpf": "64214818334",
    "name": "Alcieres",
    "lastName": "Cardoso da Silva",
    "occupation": "Servidor Público",
    "email": "alcieres@gmail.com",
    "registry": "1517882",
    "admin": true
  }
}

let assessment = new Assessment;
assessment.reqCreateNewAssessment(req, 0);

console.log(util.inspect(assessment, false, null, true /* enable colors */));




module.exports = router;
