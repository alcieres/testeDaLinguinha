const Patient = require('../models/Patient.js');
const { validationResult } = require('express-validator');

exports.findPatientGet = (req, res) => {
  res.render('findPatient/findPatient', { title: 'Teste da Linguinha', user: req.user });
};

exports.findPatientPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors.array());
    return res.render('findPatient/patientsList', {patients: "", title: 'Teste da Linguinha', user: req.user, error: errors.array() });
  }

  let name = req.body.inputName;
  let birthDate;
  req.body.inputBirthDate ? birthDate = new Date(req.body.inputBirthDate) : birthDate = "";
  let motherName = req.body.inputMotherName;
  let motherCPF = req.body.inputMotherCPF;
  let assessmentDate;
  req.body.inputAssessmentDate ? assessmentDate = new Date(req.body.inputAssessmentDate) : assessmentDate = "";
  let allEmptyFields = true;

  let query = Patient.find();

  if (name) {
    query.where('name', name);
    allEmptyFields = false;
  }
  if (birthDate) {
    let birthDateTomorrow = new Date(birthDate.getTime() + 86400000);
    query.where('birthDate', {$gte: birthDate, $lt: birthDateTomorrow});
    allEmptyFields = false;
  }
  if (assessmentDate) {
    let assessmentDateTomorrow = new Date(assessmentDate.getTime() + 86400000);
    query.where('assessments.assessmentDate', {$gte: assessmentDate, $lt: assessmentDateTomorrow});
    allEmptyFields = false;
  }
  if (motherName) {
    query.where('motherName', motherName);
    allEmptyFields = false;
  }
  if (motherCPF) {
    query.where('motherCPF', motherCPF);
    allEmptyFields = false;
  }

  if (allEmptyFields){
    res.render('findPatient/patientsList', {patients: "", title: 'Teste da Linguinha', user: req.user, error: [{msg: 'Nenhum paciente encontrado.'}]});
  }

  // console.log("\n Condições:");
  // console.log(query._conditions.valueOf());

  query.sort({name: 1}).exec((err, doc) =>{
    if (err){
      console.log("Erro de Acesso ao Banco de Dados");
    } else {
      //console.log(doc);
      if (doc.length === 0){
        doc = "";
      }
      res.render('findPatient/patientsList', {patients: doc, title: 'Teste da Linguinha', user: req.user, error: [{msg: 'Nenhum paciente encontrado.'}] });
    }
  });
};

exports.patientDetails = (req, res) => {
  let id = req.params.id;
  Patient.findOne({_id: id}, function (err, doc){
    if (err){
      console.log("Erro de Acesso ao Banco de Dados");
    } else {
      //console.log(doc);
      res.render('findPatient/patientDetails', {title: 'Teste da Linguinha', user: req.user, patient: doc });
    }
  });
};