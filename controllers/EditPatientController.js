const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');
const { validationResult } = require('express-validator');
// Controle da rota que exibe a página de edição de dados pessoais de um paciente
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
// Controle da rota que encaminha os dados alterados de um paciente, sem alterar ou adicionar teste
exports.editPatientPut = function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log("Tô aqui!");
    // console.log(req.body.assessments[0].assessmentDate);
    //console.log(errors.array());
    return res.status(422).json({error: errors.array()});
  }

  let patientEdit = new Patient();
  //Início do Paciente
  patientEdit._id = req.params.id;
  patientEdit.name = req.body.inputName;
  patientEdit.birthDate = req.body.inputBirthDate;
  patientEdit.genre = req.body.rbGenre;
  patientEdit.motherName = req.body.inputMotherName;
  patientEdit.motherCPF = req.body.inputMotherCPF;
  patientEdit.fatherName = req.body.inputFatherName;
  patientEdit.address = req.body.inputAddress;
  patientEdit.residenceNumber = req.body.inputResidenceNumber;
  patientEdit.neighborhood = req.body.inputNeighborhood;
  patientEdit.state = req.body.inputState;
  patientEdit.city = req.body.inputCity;
  patientEdit.cep = req.body.inputCEP;
  patientEdit.email = req.body.inputEmail;
  patientEdit.resTel = req.body.inputResTel;
  patientEdit.commercialTel = req.body.inputCommercialTel;
  patientEdit.celPhone = req.body.inputCelPhone;
  //console.log(patientEdit);

  Patient.findOneAndUpdate({_id: req.params.id},
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
          console.log(err);
        } else {
          //console.log(doc);
          res.status(200).json({success: [{msg: "Paciente atualizado com Sucesso"}]});
        }
      })
};
// Controle da rota que abre a página para edição de um paciente e um teste já existente
exports.assessmentEditGet = function (req, res) {
  let patientId = req.query.patientId;
  let assessmentId = req.query.assessmentId;
  res.render('assessment/assessment', {title: 'Teste da Linguinha', user: req.user, patientId, assessmentId, mode: 2, active: 'navFindPatient'});
};
// Controle da rota que encaminha os dados alterados de um paciente e um exame existente e salva no banco
exports.assessmentEditPut = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  }
  //Criação do exame
  let newAssessment = new Assessment();
  let assessmentIndex = 0;
  //Início do Exame
  newAssessment._id = req.body.assessments[assessmentIndex].assessmentId;
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
  patientNew._id = req.body.patientId;
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
  let newAssessment = new Assessment();
  let assessmentIndex = 0;
  //Início do Exame
  //newAssessment._id = req.body.assessments[assessmentIndex].assessmentId;
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
  newAssessment.questionFourTwo = req.body.assessments[assessmentIndex].questionTwo;
  newAssessment.questionFourThree = req.body.assessments[assessmentIndex].questionFourThree;
  newAssessment.questionFourComments = req.body.assessments[assessmentIndex].questionFourComments;
  //Pontos Questão 4
  newAssessment.questionFourPoints = req.body.assessments[assessmentIndex].questionFourPoints;
  //Pontos da Parte I
  newAssessment.questionsOneToFourPoints = req.body.assessments[assessmentIndex].questionsOneToFourPoints;
  //Tela 04
  newAssessment.partTwoQuestionOne = req.body.assessments[assessmentIndex].partTwoQuestionOne;
  newAssessment.partTwoQuestionTwoOne = req.body.assessments[assessmentIndex].partTwoQuestionTwoTwo;
  newAssessment.partTwoQuestionTwoTwo = req.body.assessments[assessmentIndex].partTwoQuestionTwoThree;
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
  patientNew._id = req.body.patientId;
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
    
    console.log("\n\npatientForUpdate\n\n");
    console.log(patientForUpdate);
    console.log("\n\nPatientDB\n\n");
    console.log(patientDB);

    // Patient.findById(patientDB._id).then((patient) => {
    //   const assessment = patient.assessments.id(patientForUpdate.assessments[0]._id); // returns a matching subdocument
    //   assessment.set(patientForUpdate.assessments[0]); // updates the address while keeping its schema  
    //             });  

    //Consultar: https://stackoverflow.com/questions/46190153/update-object-inside-the-array-in-mongodb-using-mongoose   

    await patientDB.save(function (err) {
      if (err){
        return 'Erro ao salvar teste';
      }else{
        console.log("+++++++++++++++++++++++ TO AQUI +++++++++++++++");
      }
    });
    return [patientDB._id, patientDB.assessments[assessmentIndex]._id];
  }
}