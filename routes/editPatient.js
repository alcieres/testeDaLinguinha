const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const Patient = require('../models/Patient.js');
const { check, validationResult } = require('express-validator');

router.get('/:id/edit', isLoggedIn, function(req, res) {
  let id = req.params.id;
  Patient.findOne({_id: id}, function (err, doc){
    if (err){
      console.log("Erro de Acesso ao Banco de Dados");
    } else {
      doc.assessments = "";
      console.log(doc);
      res.render('editPatient/editPatient', {title: 'Teste da Linguinha', user: req.user, patient: JSON.stringify(doc) });
    }
  });
});

router.put('/patient/:id',
    isLoggedIn,
    [
      check('inputName', 'Os dados do campo "Nome" são inválidos.')
          .exists().withMessage('O campo "Nome" é obrigatório.')
          .not().isEmpty().withMessage('O campo "Nome" não pode estar vazio.')
          .isLength({min: 3, max: 100}).withMessage('O campo "Nome" pode ter entre 3 e 100 caracteres.')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputBirthDate', 'A data de nascimento é inválida.')
          .isISO8601({strict: true}),
      check('rbGenre', 'O campo "Gênero" é inválido.')
          .exists().withMessage('O campo "Gênero" é obrigatório.')
          .isInt({min: 1, max: 2}),
      check('inputMotherName', 'Os dados do campo "Nome da Mãe" são inválidos.')
          .exists().withMessage('O campo "Nome da Mãe" é obrigatório.')
          .not().isEmpty().withMessage('O campo "Nome da Mãe" é obrigatório.')
          .isLength({min: 3, max: 100}).withMessage('O campo "Nome da Mãe" pode ter entre 3 e 100 caracteres.')
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
          .trim(),
      check('inputFatherName', 'Os dados do campo "Nome do Pai" são inválidos')
          .optional({ checkFalsy: true })
          .exists().withMessage('O campo "Nome do Pai" deve ser enviado')
          .isLength({min: 3, max: 100}).withMessage('O campo "Nome do Pai" pode ter entre 3 e 100 caracteres')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputAddress', 'Os dados do campo "Endereço" são inválidos')
          .exists().withMessage('O campo "Endereço" é obrigatório')
          .not().isEmpty().withMessage('O campo "Endereço" é obrigatório')
          .isLength({min: 3, max: 100}).withMessage('O campo "Endereço" pode ter entre 3 e 100 caracteres')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputResidenceNumber', 'Os dados do campo "Nome" são inválidos')
          .exists().withMessage('O campo "Nome" é obrigatório')
          .not().isEmpty().withMessage('O campo "Nome" é obrigatório')
          .isLength({min: 1, max: 15}).withMessage('O campo "Nome da Mãe" pode ter entre 1 e 15 caracteres')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputNeighborhood', 'Os dados do campo "Bairro" são inválidos')
          .exists().withMessage('O campo "Bairro" é obrigatório')
          .not().isEmpty().withMessage('O campo "Bairro" é obrigatório')
          .isLength({min: 3, max: 100}).withMessage('O campo "Bairro" pode ter entre 1 e 15 caracteres')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputState', 'Os dados do campo "Estado" são inválidos')
          .exists().withMessage('O campo "Estado" é obrigatório')
          .not().isEmpty().withMessage('O campo "Estado" é obrigatório')
          .isLength({min: 2, max: 2}).withMessage('O campo "Estado" pode ter entre 1 e 15 caracteres')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputCity', 'Os dados do campo "Cidade" são inválidos')
          .exists().withMessage('O campo "Cidade" é obrigatório')
          .not().isEmpty().withMessage('O campo "Cidade" é obrigatório')
          .isLength({min: 1, max: 100}).withMessage('O campo "Cidade" pode ter entre 1 e 100 caracteres')
          //.escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputCEP', 'Os dados do campo "CEP" são inválidos.')
          .optional({checkFalsy: true})
          .exists().withMessage('O campo "CEP" é obrigatório.')
          .not().isEmpty().withMessage('O campo "CEP" é obrigatório.')
          .blacklist('-')
          .custom(
              (value) => {
                if (/^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(value)) {
                  return value;
                } else {
                  throw new Error('Os dados do campo "CEP" são inválidos.');
                }
              }
          )
          //.escape()
          .trim(),
      check('inputEmail', 'Os dados do campo "E-mail" são inválidos')
          .optional({ checkFalsy: true })
          .isEmail().withMessage('O campo "E-mail" é inválido')
          .normalizeEmail()
          .customSanitizer(
              (value) => {
                return value === '@' ? '' : value;
              }
          ),
      check('inputResTel', 'Os dados do campo "Telefone Residencial" são inválidos')
          .optional({checkFalsy: true})
          .blacklist('()-\\s')
          .trim()
          .isLength({min: 10, max: 11}).withMessage('O campo "Telefone Residencial" deve ter entre 10 e 11 dígitos')
          .isInt(),
      check('inputCommercialTel', 'Os dados do campo "Telefone Comercial" são inválidos')
          .optional({checkFalsy: true})
          .blacklist('()-\\s')
          .trim()
          .isLength({min: 10, max: 11}).withMessage('O campo "Telefone Comercial" deve ter entre 10 e 11 dígitos')
          .isInt(),
      //.escape(),
      check('inputCelPhone', 'Os dados do campo "Telefone Celular" são inválidos')
          .optional({checkFalsy: true})
          .blacklist('()-\\s')
          .trim()
          .isLength({min: 11, max: 11}).withMessage('O campo "Telefone Celular" deve ter 11 dígitos')
          .isInt().withMessage('O campo "Telefone Celular" deve ser composto somente por números'),
      //.escape()
    ],
    function(req, res) {
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
      console.log(patientEdit);

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
    });

router.get('/assessmentEdit', isLoggedIn, function (req, res, next) {
  let patientId = req.query.patientId;
  let assessmentId = req.query.assessmentId;

  res.render('assessment/assessment', {title: 'Teste da Linguinha', user: req.user, patientId, assessmentId, mode: 2});
});

router.get('/assessmentNew', isLoggedIn, function (req, res, next) {
  let patientId = req.query.patientId;

  res.render('assessment/assessment', {title: 'Teste da Linguinha', user: req.user, patientId, assessmentId: "", mode: 3});
});

router.get('/requestPatient', isLoggedIn, function (req, res) {
  let patientIdReq = req.query.patient.trim();
  Patient.findById(patientIdReq, function (err, patientDB) {
    if (err) {
      console.log(err);
    }else {
      res.status(200).json({patient: JSON.parse(JSON.stringify(patientDB))});
    }
  });
});

module.exports = router;