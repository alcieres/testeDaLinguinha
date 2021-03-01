const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');
const { validationResult } = require('express-validator');
const util = require('util');

//GET - Controle da rota que exibe a página de edição de dados pessoais de um paciente
exports.editPatientGet = function(req, res) {
  let id = req.params.id;
  Patient.findOne({_id: id}, function (err, doc){
    if (err){
      console.log("Erro de Acesso ao Banco de Dados");
    } else {
      doc.assessments = "";
      //console.log(doc);
      res.render('editPatient/editPatient', {title: 'Teste da Linguinha', user: req.user, patient: JSON.stringify(doc) });
    }
  });
};

//PUT - Controle da rota que encaminha os dados alterados de um paciente, sem alterar ou adicionar teste
exports.editPatientPut = function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log("Tô aqui!");
    // console.log(req.body.assessments[0].assessmentDate);
    //console.log(errors.array());
    return res.status(422).json({error: errors.array()});
  }

  //Criação do paciente
  let patientEdit = new Patient();
  patientEdit.reqCreateNewPatient(req, 2)
  Patient.findOneAndUpdate({_id: patientEdit._id},
  {
    name: patientEdit.name,
    birthDate: patientEdit.birthDate,
    genre: patientEdit.genre,
    motherName: patientEdit.motherName,
    motherCPF: patientEdit.motherCPF,
    fatherName: patientEdit.fatherName,
    address: patientEdit.address,
    residenceNumber: patientEdit.residenceNumber,
    neighborhood: patientEdit.neighborhood,
    state: patientEdit.state,
    city: patientEdit.city,
    cep: patientEdit.cep,
    email: patientEdit.email,
    resTel: patientEdit.resTel,
    commercialTel: patientEdit.commercialTel,
    celPhone: patientEdit.celPhone
  }, function (err, doc) {
    if (err){
      if (err.code === 11000){
        res.status(422).json({error: [{msg: "Não é possível atualizar. Já existe outro paciente com o mesmo nome, nome da mãe e data de nascimento."}]});
        console.log(err);
      } else {
        res.status(422).json({error: [{msg: "Erro de acesso ao Banco de Dados"}]});
      }
    } else {
          //console.log(doc);
          res.status(200).json({success: [{msg: "Paciente atualizado com Sucesso"}]});
        }
      });
};

//GET - Controle da rota que abre a página para edição de um paciente e um teste já existente
exports.assessmentEditGet = function (req, res) {
  let patientId = req.query.patientId;
  let assessmentId = req.query.assessmentId;
  res.render('assessment/assessment', {title: 'Teste da Linguinha', user: req.user, patientId, assessmentId, mode: 2, active: 'navFindPatient'});
};

//PUT - Controle da rota que encaminha os dados alterados de um paciente e um exame existente e salva no banco
exports.assessmentEditPut = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  }
  //Criação do exame
  let assessmentNew = new Assessment();
  assessmentNew.reqCreateNewAssessment(req, 2);
  //Criação do Paciente
  let patientNew = new Patient();
  patientNew.reqCreateNewPatient(req, 3);
  //Insere Exame criado no objeto "Paciente".
  patientNew.assessments.push(assessmentNew);
  //console.log(patientNew);
  async function update () {
    let updatedDocsIds = await findAndUpdate(patientNew, false);
    //console.log("ARRAY IDS: " + 'patientId = ' + updatedDocsIds[0] + ' e assessmentId = ' + updatedDocsIds[1]);
    if (updatedDocsIds !== 'Erro ao salvar teste'){
      res.status(200).json({success: [{msg: "Paciente atualizado e teste inserido", patientId: updatedDocsIds[0], assessmentId: updatedDocsIds[1]}]});
    } else {
     return res.status(422).json({error: [{msg: 'Erro ao salvar teste'}]});
   }
 }
 update();
};

// Controle da rota que abre a página para edição de um paciente e um novo teste
exports.assessmentNewGet = function (req, res) {
  let patientId = req.query.patientId;
  res.render('assessment/assessment', {title: 'Teste da Linguinha', user: req.user, patientId, assessmentId: "", mode: 3, active: 'navFindPatient'});
};

// Controle da rota que encaminha os dados alterados de um paciente e um exame novo e salva no banco
exports.assessmentNewPut = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  }
  
  //Criação do exame
  let assessmentNew = new Assessment();
  assessmentNew.reqCreateNewAssessment(req, 1);

  //Criação do Paciente
  let patientNew = new Patient();
  patientNew.reqCreateNewPatient(req, 3);

  //Insere Exame criado no objeto "Paciente".
  patientNew.assessments.push(assessmentNew);
  //console.log(patientNew);

  async function update () {
    let updatedDocsIds = await findAndUpdate(patientNew, true);
    //console.log("ARRAY IDS: " + 'patientId = ' + updatedDocsIds[0] + ' e assessmentId = ' + updatedDocsIds[1]);
    if (updatedDocsIds !== 'Erro ao salvar teste'){
      res.status(200).json({success: [{msg: "Paciente atualizado e teste inserido", patientId: updatedDocsIds[0], assessmentId: updatedDocsIds[1]}]});
    } else {
      return res.status(422).json({error: [{msg: 'Erro ao salvar teste'}]});
    }
  }
  update();
};
//Controle da rota que recebe uma requisição de paciente e retorna um paciente com todos os exames
exports.requestPatientGet = function (req, res) {
  let patientIdReq = req.query.patient.trim();
  Patient.findById(patientIdReq, function (err, patientDB) {
    if (err) {
      console.log(err);
    }else {
      res.status(200).json({patient: JSON.parse(JSON.stringify(patientDB))});
    }
  });
};

//Função que atualiza um paciente no Banco de Dados
async function findAndUpdate(patientForUpdate, newAssessment) {
  let patientDB = await Patient.findById(patientForUpdate._id);
  patientDB.name = patientForUpdate.name;
  patientDB.birthDate = patientForUpdate.birthDate;
  patientDB.genre = patientForUpdate.genre;
  patientDB.motherName = patientForUpdate.motherName;
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
    await patientDB.save(function (err) {
      if (err){
        return 'Erro ao salvar teste';
      }
    });
    return [patientDB._id, patientForUpdate.assessments[0]._id];
  } else {
    let assessmentIndex = patientDB.assessments.findIndex(assessment => assessment._id.equals(patientForUpdate.assessments[0]._id));
    //patientDB.assessments[assessmentIndex] = patientForUpdate.assessments[0];
    
    patientDB.assessments[assessmentIndex].assessmentDate = patientForUpdate.assessments[0].assessmentDate;
    patientDB.assessments[assessmentIndex].breastfeeding = patientForUpdate.assessments[0].breastfeeding;
    patientDB.assessments[assessmentIndex].breastfeedingTime = patientForUpdate.assessments[0].breastfeedingTime;
    patientDB.assessments[assessmentIndex].breastfeedingTiredness = patientForUpdate.assessments[0].breastfeedingTiredness;
    patientDB.assessments[assessmentIndex].breastfeedingSleep = patientForUpdate.assessments[0].breastfeedingSleep;
    patientDB.assessments[assessmentIndex].releasingNipple = patientForUpdate.assessments[0].releasingNipple;
    patientDB.assessments[assessmentIndex].biteNipple = patientForUpdate.assessments[0].biteNipple;
    patientDB.assessments[assessmentIndex].obsBreastfeeding = patientForUpdate.assessments[0].obsBreastfeeding;
    //Pontos História Clínica
    patientDB.assessments[assessmentIndex].clinicalHistoryPoints = patientForUpdate.assessments[0].clinicalHistoryPoints;
    //Tela 02
    patientDB.assessments[assessmentIndex].questionOne = patientForUpdate.assessments[0].questionOne;
    patientDB.assessments[assessmentIndex].questionTwo = patientForUpdate.assessments[0].questionTwo;
    patientDB.assessments[assessmentIndex].questionThree = patientForUpdate.assessments[0].questionThree;
    //Pontos Questões de Um a Três
    patientDB.assessments[assessmentIndex].questionsOneToThreePoints = patientForUpdate.assessments[0].questionsOneToThreePoints;
    //Tela 03
    patientDB.assessments[assessmentIndex].questionFour = patientForUpdate.assessments[0].questionFour;
    patientDB.assessments[assessmentIndex].questionFourOne = patientForUpdate.assessments[0].questionFourOne;
    patientDB.assessments[assessmentIndex].questionFourTwo = patientForUpdate.assessments[0].questionFourTwo;
    patientDB.assessments[assessmentIndex].questionFourThree = patientForUpdate.assessments[0].questionFourThree;
    patientDB.assessments[assessmentIndex].questionFourComments = patientForUpdate.assessments[0].questionFourComments;
    //Pontos Questão 4
    patientDB.assessments[assessmentIndex].questionFourPoints = patientForUpdate.assessments[0].questionFourPoints;
    //Pontos da Parte I
    patientDB.assessments[assessmentIndex].questionsOneToFourPoints = patientForUpdate.assessments[0].questionsOneToFourPoints;
    //Tela 04
    patientDB.assessments[assessmentIndex].partTwoQuestionOne = patientForUpdate.assessments[0].partTwoQuestionOne;
    patientDB.assessments[assessmentIndex].partTwoQuestionTwoOne = patientForUpdate.assessments[0].partTwoQuestionTwoOne;
    patientDB.assessments[assessmentIndex].partTwoQuestionTwoTwo = patientForUpdate.assessments[0].partTwoQuestionTwoTwo;
    patientDB.assessments[assessmentIndex].partTwoQuestionTwoThree = patientForUpdate.assessments[0].partTwoQuestionTwoThree;
    patientDB.assessments[assessmentIndex].partTwoQuestionTwoFour = patientForUpdate.assessments[0].partTwoQuestionTwoFour;
    patientDB.assessments[assessmentIndex].obsSuction = patientForUpdate.assessments[0].obsSuction;
    //Pontos da Parte II
    patientDB.assessments[assessmentIndex].partTwoQuestionPoints = patientForUpdate.assessments[0].partTwoQuestionPoints;
    //Pontos Totais Exame Clínico
    patientDB.assessments[assessmentIndex].clinicalAssessmentPoints = patientForUpdate.assessments[0].clinicalAssessmentPoints;
    //Pontos Totais do Exame
    patientDB.assessments[assessmentIndex].historyAssessmentPoints = patientForUpdate.assessments[0].historyAssessmentPoints;
    //Tela 05
    patientDB.assessments[assessmentIndex].obsResume = patientForUpdate.assessments[0].obsResume;
    patientDB.assessments[assessmentIndex].assBehavior = patientForUpdate.assessments[0].assBehavior;
    patientDB.assessments[assessmentIndex].descBehavior = patientForUpdate.assessments[0].descBehavior;
    //Usuário
    patientDB.assessments[assessmentIndex].userCPF = patientForUpdate.assessments[0].userCPF;
    patientDB.assessments[assessmentIndex].userName = patientForUpdate.assessments[0].userName;
    patientDB.assessments[assessmentIndex].userLastName = patientForUpdate.assessments[0].userLastName;
    patientDB.assessments[assessmentIndex].userOccupation = patientForUpdate.assessments[0].userOccupation;
    patientDB.assessments[assessmentIndex].userRegistry = patientForUpdate.assessments[0].userRegistry;

    await patientDB.save(function (err) {
      if (err){
        return 'Erro ao salvar teste';
      }
    });
    return [patientDB._id, patientDB.assessments[assessmentIndex]._id];
  }
}