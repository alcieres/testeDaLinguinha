const mongoose = require('mongoose');
const Assessment = require('../models/Assessment.js');
const assessment = new Assessment();

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

module.exports = mongoose.model('Patient', patientSchema);