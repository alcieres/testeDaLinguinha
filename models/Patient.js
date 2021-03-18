const mongoose = require('mongoose');
const Assessment = require('../models/Assessment.js');
const assessment = new Assessment();
const util = require('util');

const patientSchema = new mongoose.Schema({
  name:  String,
  birthDate: Date,
  genre: String,
  motherName: String,
  motherCPF: String,
  fatherName: String,
  address: String,
  residenceNumber: String,
  neighborhood: String,
  state: String,
  city: String,
  cep: String,
  email: String,
  resTel: String,
  commercialTel: String,
  celPhone: String,
  familyHistory: Number,
  problemDescription: String,
  patientHealthProblem: Number,
  healthProblemDescription: String,
  //Início do Exame
  assessments: [assessment.schema]

});

patientSchema.index({ name: 1, birthDate: 1, motherName: 1 }, {unique: true});


/*
Função para preencher dados de um paciente
Recebe a requisição e o tipo.
o tipo pode ser:
- 1: Criar novo paciente (não recebe o "_id");
- 2: Editar somente dados cadastrais o paciente;
- 3: Editar dados cadastrais e aspectos fixos da saúde do paciente.
*/

patientSchema.methods.reqCreateNewPatient = function (req, type) {
  console.log(util.inspect(req.body, false, null, true /* enable colors */));
  if (type == 2){
    this._id = req.params.id;
  }
  if (type == 3){
    this._id = req.body.patientId;
  }
  this.name = req.body.name;
  this.birthDate = req.body.birthDate;
  this.genre = req.body.genre;
  this.motherName = req.body.motherName;
  this.motherCPF = req.body.motherCPF;
  this.fatherName = req.body.fatherName;
  this.address = req.body.address;
  this.residenceNumber = req.body.residenceNumber;
  this.neighborhood = req.body.neighborhood;
  this.state = req.body.state;
  this.city = req.body.city;
  this.cep = req.body.cep;
  this.email = req.body.email;
  this.resTel = req.body.resTel;
  this.commercialTel = req.body.commercialTel;
  this.celPhone = req.body.celPhone;
  if (type != 2){
    this.familyHistory = req.body.familyHistory;
    this.problemDescription = req.body.problemDescription;
    this.patientHealthProblem = req.body.patientHealthProblem;
    this.healthProblemDescription = req.body.healthProblemDescription;
  }
};

module.exports = mongoose.model('Patient', patientSchema);