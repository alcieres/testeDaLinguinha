const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');
const { validationResult } = require('express-validator');

exports.assessmentCreateGet = function (req, res, next) {
  res.render('assessment/assessment', {title: 'Teste da Linguinha', user: req.user, patientId: "", assessmentId: '', mode: 1, active: 'navAssessment'});
};

exports.assessmentCreatePost = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  }
  //Criação do exame
  let newAssessment = new Assessment();
  let assessmentIndex = 0;
  //Início do Exame
  //newAssessment._id = req.body.assessmentId;
  newAssessment.assessmentDate = req.body.assessments[assessmentIndex].assessmentDate;
  newAssessment.breastfeeding = req.body.assessments[assessmentIndex].breastfeeding;
  newAssessment.breastfeedingTime = req.body.assessments[assessmentIndex].breastfeedingTime;
  newAssessment.breastfeedingTiredness = req.body.assessments[assessmentIndex].breastfeedingTiredness;
  newAssessment.breastfeedingSleep = req.body.assessments[assessmentIndex].breastfeedingSleep;
  newAssessment.releasingNipple = req.body.assessments[assessmentIndex].releasingNipple;
  newAssessment.biteNipple = req.body.assessments[assessmentIndex].biteNipple;
  newAssessment.obsBreastfeeding = req.body.assessments[assessmentIndex].obsBreastfeeding;
  //Pontos História Clínica
  newAssessment.clinicalHistoryPoints = req.body.assessments[assessmentIndex].clinicalHistoryPoints;
  //Tela 02
  newAssessment.questionOne = req.body.assessments[assessmentIndex].questionOne;
  newAssessment.questionTwo = req.body.assessments[assessmentIndex].questionTwo;
  newAssessment.questionThree = req.body.assessments[assessmentIndex].questionThree;
  //Pontos Questões de Um a Três
  newAssessment.questionsOneToThreePoints = req.body.assessments[assessmentIndex].questionsOneToThreePoints;
  //Tela 03
  newAssessment.questionFour = req.body.assessments[assessmentIndex].questionFour;
  newAssessment.questionFourOne = req.body.assessments[assessmentIndex].questionFourOne;
  newAssessment.questionFourTwo = req.body.assessments[assessmentIndex].questionFourTwo;
  newAssessment.questionFourThree = req.body.assessments[assessmentIndex].questionFourThree;
  newAssessment.questionFourComments = req.body.assessments[assessmentIndex].questionFourComments;
  //Pontos Questão 4
  newAssessment.questionFourPoints = req.body.assessments[assessmentIndex].questionFourPoints;
  //Pontos da Parte I
  newAssessment.questionsOneToFourPoints = req.body.assessments[assessmentIndex].questionsOneToFourPoints;
  //Tela 04
  newAssessment.partTwoQuestionOne = req.body.assessments[assessmentIndex].partTwoQuestionOne;
  newAssessment.partTwoQuestionTwoOne = req.body.assessments[assessmentIndex].partTwoQuestionTwoOne;
  newAssessment.partTwoQuestionTwoTwo = req.body.assessments[assessmentIndex].partTwoQuestionTwoTwo;
  newAssessment.partTwoQuestionTwoThree = req.body.assessments[assessmentIndex].partTwoQuestionTwoThree;
  newAssessment.partTwoQuestionTwoFour = req.body.assessments[assessmentIndex].partTwoQuestionTwoFour;
  newAssessment.obsSuction = req.body.assessments[assessmentIndex].obsSuction;
  //Pontos da Parte II
  newAssessment.partTwoQuestionPoints = req.body.assessments[assessmentIndex].partTwoQuestionPoints;
  //Pontos Totais Exame Clínico
  newAssessment.clinicalAssessmentPoints = req.body.assessments[assessmentIndex].clinicalAssessmentPoints;
  //Pontos Totais do Exame
  newAssessment.historyAssessmentPoints = req.body.assessments[assessmentIndex].historyAssessmentPoints;
  //Tela 05
  newAssessment.obsResume = req.body.assessments[assessmentIndex].obsResume;
  newAssessment.assBehavior = req.body.assessments[assessmentIndex].assBehavior;
  newAssessment.descBehavior = req.body.assessments[assessmentIndex].descBehavior;
  //Usuário
  newAssessment.userCPF = req.user.cpf;
  newAssessment.userName = req.user.name;
  newAssessment.userLastName = req.user.lastName;
  newAssessment.userOccupation = req.user.occupation;
  newAssessment.userRegistry = req.user.registry;

  //Criação do Paciente
  let patientNew = new Patient();
  //Início do Paciente
  //patientNew._id = req.body.patientId;
  patientNew.name = req.body.name;
  patientNew.birthDate = req.body.birthDate;
  patientNew.genre = req.body.genre;
  patientNew.motherName = req.body.motherName;
  patientNew.motherCPF = req.body.motherCPF;
  patientNew.fatherName = req.body.fatherName;
  patientNew.address = req.body.address;
  patientNew.residenceNumber = req.body.residenceNumber;
  patientNew.neighborhood = req.body.neighborhood;
  patientNew.state = req.body.state;
  patientNew.city = req.body.city;
  patientNew.cep = req.body.cep;
  patientNew.email = req.body.email;
  patientNew.resTel = req.body.resTel;
  patientNew.commercialTel = req.body.commercialTel;
  patientNew.celPhone = req.body.celPhone;
  patientNew.familyHistory = req.body.familyHistory;
  patientNew.problemDescription = req.body.problemDescription;
  patientNew.patientHealthProblem = req.body.patientHealthProblem;
  patientNew.healthProblemDescription = req.body.healthProblemDescription;

  //Insere Exame criado no objeto "Paciente".
  patientNew.assessments.push(newAssessment);
  //console.log("Novo Paciente: " + patientNew);

  patientNew.save(function (err, doc){
    if (err){
      if (err.code === 11000){
        async function update () {
          let updatedDocsIds = await findAndUpdate(patientNew, true);
          //console.log("ARRAY IDS: " + 'patientId = ' + updatedDocsIds[0] + ' e assessmentId = ' + updatedDocsIds[1]);
          res.status(200).json({success: [{msg: "Paciente atualizado e teste inserido", patientId: updatedDocsIds[0], assessmentId: updatedDocsIds[1]}]});
        }
        update();
      } else {
        res.status(422).json({success: "Erro de acesso ao Banco de Dados"});
      }
    }else {
      //console.log(doc);
      res.status(200).json({success: [{msg: "Novo paciente inserido com Sucesso", patientId: patientNew._id, assessmentId: patientNew.assessments[0]._id}]});
    }
  });
};

exports.assessmentExtractGet = function (req, res) {
  let patientId = req.query.patientId;
  let assessmentId = req.query.assessmentId;
  res.render('assessment/assessmentExtract', {title: 'Teste da Linguinha', user: req.user, patientId, assessmentId});
};

exports.assessmentRequestGet = function (req, res) {
  let patientIdReq = req.query.patient.trim();
  let assessmentIdReq = req.query.assessment.trim();
  Patient.findById(patientIdReq, function (err, patientDB) {
    if (err) {
      console.log(err);
    } else {
      let patientSend = JSON.parse(JSON.stringify(patientDB));
      patientSend.assessments.splice(0, patientSend.assessments.length);
      let assessmentIndex = patientDB.assessments.findIndex(assessment => assessment._id.equals(assessmentIdReq));
      patientSend.assessments.push(patientDB.assessments[assessmentIndex]);
      res.status(200).json({patient: patientSend});
    }
  });
};

//Funcão que atualiza um paciente no Banco de Dados
async function findAndUpdate(patientForUpdate, newAssessment) {
  let patientDB = await Patient.findOne({name: patientForUpdate.name, birthDate: patientForUpdate.birthDate, motherName: patientForUpdate.motherName});
  patientDB.genre = patientForUpdate.genre;
  patientDB.motherCPF = patientForUpdate.motherCPF;
  patientDB.fatherName = patientForUpdate.fatherName;
  patientDB.address = patientForUpdate.address;
  patientDB.residenceNumber = patientForUpdate.residenceNumber;
  patientDB.neighborhood = patientForUpdate.neighborhood;
  patientDB.state = patientForUpdate.state;
  patientDB.city = patientForUpdate.city;
  patientDB.cep = patientForUpdate.cep;
  patientDB.email = patientForUpdate.email;
  patientDB.resTel = patientForUpdate.resTel;
  patientDB.commercialTel = patientForUpdate.commercialTel;
  patientDB.celPhone = patientForUpdate.celPhone;
  if (patientDB.familyHistory != patientForUpdate.familyHistory){
    if (patientDB.familyHistory == 2){
      patientDB.assessments.forEach(function (assessment){
        assessment.clinicalHistoryPoints --;
        assessment.historyAssessmentPoints --;
      });
    } else if (patientDB.familyHistory == 1){
      patientDB.assessments.forEach(function (assessment){
        assessment.clinicalHistoryPoints ++;
        assessment.historyAssessmentPoints ++;
      });
    }
  }
  patientDB.familyHistory = patientForUpdate.familyHistory;
  patientDB.problemDescription = patientForUpdate.problemDescription;
  patientDB.patientHealthProblem = patientForUpdate.patientHealthProblem;
  patientDB.healthProblemDescription = patientForUpdate.healthProblemDescription;
  if (newAssessment) {
    patientDB.assessments.push(patientForUpdate.assessments[0]);
    await patientDB.save();
    return [patientDB._id, patientForUpdate.assessments[0]._id];
  } else {
    let assessmentIndex = patientDB.assessments.findIndex(assessment => assessment._id.equals(patientForUpdate.assessments[0]._id));
    patientDB.assessments[assessmentIndex] = patientForUpdate.assessments[0];
    await patientDB.save();
    return [patientDB._id, patientDB.assessments[assessmentIndex]._id];
  }
}