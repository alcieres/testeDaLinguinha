const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');
const { validationResult } = require('express-validator');

//GET - Exibe a página de cadastro de novo exame
exports.assessmentCreateGet = function (req, res, next) {
  res.render('assessment/assessment', {title: 'Teste da Linguinha', user: req.user, patientId: "", assessmentId: '', mode: 1, active: 'navAssessment'});
};

//POST - Cria novo paciente e exame no banco
exports.assessmentCreatePost = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  }

let newAssessment = new Assessment();
newAssessment.reqCreateNewAssessment(req, 0);

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