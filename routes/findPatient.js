const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const Patient = require('../models/Patient.js');
const { check, validationResult } = require('express-validator');

/* Página Inicial */
router.get('/', isLoggedIn, function(req, res) {
  res.render('findPatient/findPatient', { title: 'Teste da Linguinha', user: req.user });
});

router.post('/list',
    isLoggedIn,
    [
      check('inputName', 'Os dados do campo "Nome" são inválidos.')
          .optional({checkFalsy: true})
          .isLength({max: 100}).withMessage('O campo "Nome" pode ter entre 3 e 100 caracteres.')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputBirthDate', 'A data de nascimento é inválida.')
          .optional({checkFalsy: true})
          .isISO8601({strict: true}),
      check('assessments[0].assessmentDate', 'A data do teste é inválida.')
          .optional({checkFalsy: true})
          .isISO8601({strict: true}),
      check('inputMotherName', 'Os dados do campo "Nome da Mãe" são inválidos.')
          .optional({checkFalsy: true})
          .isLength({max: 100}).withMessage('O campo "Nome da Mãe" pode ter entre 3 e 100 caracteres.')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputMotherCPF', 'Os dados do campo "CPF da Mãe" são inválidos.')
          .optional({checkFalsy: true})
          .exists().withMessage('O campo "CPF da Mãe" deve ser enviado.')
          .isLength({min: 14, max: 14}).withMessage('O campo "CPF da Mãe" deve ter 14 dígitos.')
          .blacklist('.-')
          .isInt()
          .custom(
              (value) => {
                let sum = 0;
                let rest;
                if (value.length !== 11 ||
                    value === "00000000000" ||
                    value === "11111111111" ||
                    value === "22222222222" ||
                    value === "33333333333" ||
                    value === "44444444444" ||
                    value === "55555555555" ||
                    value === "66666666666" ||
                    value === "77777777777" ||
                    value === "88888888888" ||
                    value === "99999999999") {
                  throw new Error('O CPF informado é inválido.');
                }
                for (let i = 1; i <= 9; i++) {
                  sum += parseInt(value.substring(i - 1, i)) * (11 - i);
                }
                rest = (sum * 10) % 11;
                if ((rest === 10) || (rest === 11)) {
                  rest = 0;
                }
                if (rest !== parseInt(value.substring(9, 10))) {
                  throw new Error('O CPF informado é inválido.');
                }
                sum = 0;
                for (let i = 1; i <= 10; i++) {
                  sum += parseInt(value.substring(i - 1, i)) * (12 - i);
                }
                rest = (sum * 10) % 11;
                if ((rest === 10) || (rest === 11)) {
                  rest = 0;
                }
                if (rest !== parseInt(value.substring(10, 11))) {
                  throw new Error('O CPF informado é inválido.');
                }
                return value;
              })
          //.escape()
          .trim()
    ],
    function(req, res) {
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
});

router.get('/:id', isLoggedIn, function(req, res) {
  let id = req.params.id;
  Patient.findOne({_id: id}, function (err, doc){
    if (err){
      console.log("Erro de Acesso ao Banco de Dados");
    } else {
      //console.log(doc);
      res.render('findPatient/patientDetails', {title: 'Teste da Linguinha', user: req.user, patient: doc });
    }
  });
});

router.get('/:id/edit', isLoggedIn, function(req, res) {
  let id = req.params.id;
  Patient.findOne({_id: id}, function (err, doc){
    if (err){
      console.log("Erro de Acesso ao Banco de Dados");
    } else {
      doc.assessments = "";
      console.log(doc);
      res.render('findPatient/editPatient', {title: 'Teste da Linguinha', user: req.user, patient: doc });
    }
  });
});

module.exports = router;
