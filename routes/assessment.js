const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');
const { check, validationResult } = require('express-validator');

/* Página Inicial */
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('assessment/assessment', {title: 'Teste da Linguinha', user: req.user});
});

// ROTA CREATE - Rota para inserção de um novo paciente com o primeiro exame no banco
router.post('/',
    isLoggedIn,
    [
      check('inputName', 'Os dados do campo "Nome" são inválidos.')
          .exists().withMessage('O campo "Nome" é obrigatório.')
          .not().isEmpty().withMessage('O campo "Nome" não pode estar vazio.')
          .isLength({min: 3, max: 100}).withMessage('O campo "Nome" pode ter entre 3 e 100 caracteres.')
          .escape()
          .trim()
          .customSanitizer(
              (value) => {
                value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                return value;
              }
          ),
      check('inputBirthDate', 'A data de nascimento é inválida.')
          .isISO8601({strict: true}),
      check('inputAssessmentDate', 'A data de nascimento é inválida.')
          .isISO8601({strict: true}),
      check('rbGenre', 'O campo "Gênero" é inválido.')
          .exists().withMessage('O campo "Gênero" é obrigatório.')
          .isInt({min: 1, max: 2}),
      check('inputMotherName', 'Os dados do campo "Nome da Mãe" são inválidos.')
          .exists().withMessage('O campo "Nome da Mãe" é obrigatório.')
          .not().isEmpty().withMessage('O campo "Nome da Mãe" é obrigatório.')
          .isLength({min: 3, max: 100}).withMessage('O campo "Nome da Mãe" pode ter entre 3 e 100 caracteres.')
          .escape()
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
          .escape()
          .trim(),
      check('inputFatherName', 'Os dados do campo "Nome do Pai" são inválidos')
          .exists().withMessage('O campo "Nome do Pai" deve ser enviado')
          .isLength({min: 3, max: 100}).withMessage('O campo "Nome do Pai" pode ter entre 3 e 100 caracteres')
          .escape()
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
          .escape()
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
          .escape()
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
          .escape()
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
          .escape()
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
          .escape()
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
          .escape()
          .trim(),
      check('inputEmail', 'Os dados do campo "E-mail" são inválidos')
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
          .isInt()
          .escape(),
      check('inputCelPhone', 'Os dados do campo "Telefone Celular" são inválidos')
          .optional({checkFalsy: true})
          .blacklist('()-\\s')
          .trim()
          .isLength({min: 11, max: 11}).withMessage('O campo "Telefone Celular" deve ter 11 dígitos')
          .isInt().withMessage('O campo "Telefone Celular" deve ser composto somente por números')
          .escape(),
      check('rbFamilyHistory', 'Os dados do campo "Antecedentes Familiares" são inválidos')
          .isIn(['1', '2', undefined]),
      check('inputProblemDescription', 'Os dados do campo "Quem e qual o problema" são inválidos')
          .trim()
          .isLength({min: 0, max: 1000}).withMessage('O campo "Quem e qual o problema" pode ter no máximo 1000 caracteres')
          .escape(),
      check('rbPatientHealthProblem', 'Os dados do campo "Problemas de Saúde" são inválidos')
          .isIn(['1', '2', undefined]),
      check('inputHealthProblemDescription', 'Os dados do campo "Quem e qual o problema" são inválidos')
          .trim()
          .isLength({min: 0, max: 1000}).withMessage('O campo "Quem e qual o problema" pode ter no máximo 1000 caracteres')
          .escape(),
      check('rbBreastfeeding', 'Os dados do campo "Mama no Peito?" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('rbBreastfeedingTime', 'Os dados do campo "Tempo entre as mamadas" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbBreastfeedingTiredness', 'Os dados do campo "Cansaço para mamar?" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbBreastfeedingSleep', 'Os dados do campo "Mama um pouquinho e dorme?" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbReleasingNipple', 'Os dados do campo "Vai soltando o mamilo?" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbBiteNipple', 'Os dados do campo "Morde o mamilo?" são inválidos')
          .isIn(['1', '2', undefined]),
      check('obsBreastfeeding', 'Os dados do campo "Observações" da pergunta "Mama no Peito?" são inválidos')
          .trim()
          .isLength({max: 1000}).withMessage('pode ter no máximo 1000 caracteres')
          .escape(),
      check('rbQuestionOne', 'Os dados da questão "1. Postura dos lábios em repouso" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('rbQuestionTwo', 'Os dados da questão "2. Tendência do posicionamento da língua durante o choro" são inválidos')
          .isIn(['1', '2', '3', '4', undefined]),
      check('rbQuestionThree', 'Os dados da questão "3. Forma da ponta da língua quando elevada durante o choro" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('rbQuestionFour', 'Os dados da questão "4. Frênulo da língua" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('rbQuestionFourOne', 'Os dados da questão "4.1. Espessura do frênulo" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbQuestionFourTwo', 'Os dados da questão "4.2. Fixação do frênulo na face sublingual (ventral) da língua" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('rbQuestionFourThree', 'Os dados da questão "4.3. Fixação do frênulo no assoalho da boca" são inválidos')
          .isIn(['1', '2', undefined]),
      check('obsBreastfeeding', 'Os dados do campo "Observações" da "Parte I" são inválidos')
          .trim()
          .isLength({max: 1000}).withMessage('O campo "Observações" da "Parte I" pode ter no máximo 1000 caracteres')
          .escape(),
      check('rbPartTwoQuestionOne', 'Os dados da questão "1.1 Movimento da língua" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbPartTwoQuestionTwoOne', 'Os dados da questão "2.1 Ritmo da sucção" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbPartTwoQuestionTwoTwo', 'Os dados da questão "2.2 Coordenação entre sucção/deglutição/respiração" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbPartTwoQuestionTwoThree', 'Os dados da questão "2.3 "Morde" o mamilo" são inválidos')
          .isIn(['1', '2', undefined]),
      check('rbPartTwoQuestionTwoFour', 'Os dados da questão "2.4 Estalos de língua durante a sucção" são inválidos')
          .isIn(['1', '2', undefined]),
      check('obsSuction', 'Os dados do campo "Observações" da "Parte II" são inválidos')
          .trim()
          .isLength({min: 0, max: 1000}).withMessage('O campo "Observações" da "Parte II" pode ter no máximo 1000 caracteres')
          .escape(),
      check('obsResume', 'Os dados do campo "Observações" do "Resumo Final" são inválidos')
          .trim()
          .isLength({max: 1000}).withMessage('O campo "Observações" do "Resumo Final" pode ter no máximo 1000 caracteres')
          .escape(),
      check('rbBehavior', 'Os dados da questão "CONDUTA" no Resumo Final são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('descBehavior', 'Os dados do campo "Observações" do "Resumo Final" são inválidos')
          .trim()
          .isLength({max: 100}).withMessage('O campo "Descrição da conduta" do "Resumo Final" pode ter no máximo 100 caracteres')
          .escape()
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Tô aqui!");
        console.log(errors.array());
        console.log(req.body);
        return res.status(422).json({error: errors.array()
        });
      }

      //Criação do exame
      let newAssessment = new Assessment();
      //Início do Exame
      //newAssessment._id = req.body.assessmentId;
      newAssessment.assessmentDate = req.body.inputAssessmentDate;
      newAssessment.breastfeeding = req.body.rbBreastfeeding;
      newAssessment.breastfeedingTime = req.body.rbBreastfeedingTime;
      newAssessment.breastfeedingTiredness = req.body.rbBreastfeedingTiredness;
      newAssessment.breastfeedingSleep = req.body.rbBreastfeedingSleep;
      newAssessment.releasingNipple = req.body.rbReleasingNipple;
      newAssessment.biteNipple = req.body.rbBiteNipple;
      newAssessment.obsBreastfeeding = req.body.obsBreastfeeding;
      //Tela 02
      newAssessment.questionOne = req.body.rbQuestionOne;
      newAssessment.questionTwo = req.body.rbQuestionTwo;
      newAssessment.questionThree = req.body.rbQuestionThree;
      //Tela 03
      newAssessment.questionFour = req.body.rbQuestionFour;
      newAssessment.questionFourOne = req.body.rbQuestionFourOne;
      newAssessment.questionFourTwo = req.body.rbQuestionFourTwo;
      newAssessment.questionFourThree = req.body.rbQuestionFourThree;
      newAssessment.questionFourComments = req.body.inputQuestionFourComments;
      //Tela 04
      newAssessment.partTwoQuestionOne = req.body.rbPartTwoQuestionOne;
      newAssessment.partTwoQuestionTwoOne = req.body.rbPartTwoQuestionTwoOne;
      newAssessment.partTwoQuestionTwoTwo = req.body.rbPartTwoQuestionTwoTwo;
      newAssessment.partTwoQuestionTwoThree = req.body.rbPartTwoQuestionTwoThree;
      newAssessment.partTwoQuestionTwoFour = req.body.rbPartTwoQuestionTwoFour;
      newAssessment.obsSuction = req.body.obsSuction;
      //Tela 05
      newAssessment.obsResume = req.body.obsResume;
      newAssessment.behavior = req.body.rbBehavior;
      newAssessment.descBehavior = req.body.descBehavior;
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
      patientNew.name = req.body.inputName;
      patientNew.birthDate = req.body.inputBirthDate;
      patientNew.genre = req.body.rbGenre;
      patientNew.motherName = req.body.inputMotherName;
      patientNew.motherCPF = req.body.inputMotherCPF;
      patientNew.fatherName = req.body.inputFatherName;
      patientNew.address = req.body.inputAddress;
      patientNew.residenceNumber = req.body.inputResidenceNumber;
      patientNew.neighborhood = req.body.inputNeighborhood;
      patientNew.state = req.body.inputState;
      patientNew.city = req.body.inputCity;
      patientNew.cep = req.body.inputCEP;
      patientNew.email = req.body.inputEmail;
      patientNew.resTel = req.body.inputResTel;
      patientNew.commercialTel = req.body.inputCommercialTel;
      patientNew.celPhone = req.body.inputCelPhone;
      patientNew.familyHistory = req.body.rbFamilyHistory;
      patientNew.problemDescription = req.body.inputProblemDescription;
      patientNew.patientHealthProblem = req.body.rbPatientHealthProblem;
      patientNew.healthProblemDescription = req.body.inputHealthProblemDescription;
      patientNew.assessments.push(newAssessment);

      //console.log(patientNew);

      patientNew.save(function (err, doc){
          if (err){
              if (err.code ===11000){
                async function findAndUpdate() {
                  let patientDB = await Patient.findOne({name: patientNew.name, birthDate: patientNew.birthDate, motherName: patientNew.motherName});
                  patientDB.genre = patientNew.genre;
                  patientDB.motherCPF = patientNew.motherCPF;
                  patientDB.fatherName = patientNew.fatherName;
                  patientDB.address = patientNew.address;
                  patientDB.residenceNumber = patientNew.residenceNumber;
                  patientDB.neighborhood = patientNew.neighborhood;
                  patientDB.state = patientNew.state;
                  patientDB.city = patientNew.city;
                  patientDB.cep = patientNew.cep;
                  patientDB.email = patientNew.email;
                  patientDB.resTel = patientNew.resTel;
                  patientDB.commercialTel = patientNew.commercialTel;
                  patientDB.celPhone = patientNew.celPhone;
                  patientDB.familyHistory = patientNew.familyHistory;
                  patientDB.problemDescription = patientNew.problemDescription;
                  patientDB.patientHealthProblem = patientNew.patientHealthProblem;
                  patientDB.healthProblemDescription = patientNew.healthProblemDescription;
                  patientDB.assessments.push(patientNew.assessments[0]);
                  console.log(patientNew.assessments[0]);
                  await patientDB.save();
                  return res.status(200).json({success: "Atualizado"});
                }
                return findAndUpdate();
              }
            res.status(422).json({success: "Erro de acesso ao Banco de Dados"});
          }else {
            console.log(doc);
            res.status(200).json({success: "Foi que foi"});
          }
        });
      // Patient.save(patientNew, function (err) {
      //   if (err) {
      //     console.log('error while user register!', err);
      //     if (err.name === "UserExistsError") {
      //       res.status(422).json({error: [{msg: 'CPF já cadastrado para outro usuário.'}]});
      //     } else {
      //       res.status(422).json({error: [{msg: 'Erro de acesso ao banco de dados.'}]});
      //     }
      //   }
      //   res.status(201).json({success: [{msg: 'Novo usuário registrado com sucesso.'}]});
      // });
    });

router.get('/assessmentExtract', function (req, res, next) {
  let patientId = '5dc9721fc27b0b19188f5814';
  let assessmentId = '5dc9721fc27b0b19188f5815';

  res.render('assessment/assessmentExtract', {title: 'Teste da Linguinha', user: req.user, patientId, assessmentId});
});

router.get('/patient/requestAssessment', function (req, res, next) {
  let patientIdReq = req.query.patient;
  let assessmentIdReq = req.query.assessment;
  Patient.findById(patientIdReq, function (err, patient) {
    if (err) {
      console.log(err);
    }
    console.log(patient);
    res.status(200).json({patient});
  });
});

router.get('/teste', function (req, res, next) {
  res.send("Teste");
});

// patientTest = new Patient(
//     {
//       name: 'Antonella Tatiane Renata das Neves',
//       birthDate: new Date('2019-09-07'),
//       genre: '2',
//       motherName: 'Isabel Isabella Bárbara Pires'
//       motherCPF: '15874814051',
//       fatherName: 'Edson Luiz Levi Silveira',
//       address: 'Avenida Frei Augusto de Santana',
//       residenceNumber: '913',
//       neighborhood: 'Glória',
//       state: 'SE',
//       city: 'Aracaju',
//       cep: '95520000',
//       email: 'edsonluizlevisilveira@grupomegavale.com.br',
//       resTel: '',
//       commercialTel: '',
//       celPhone: '79989730356',
//       familyHistory: 0,
//       problemDescription: 'Não há problemas ho histórico familiar',
//       patientHealthProblem: 0,
//       healthProblemDescription: 'Não tem problemas de saúde, mas solta pum',
// //Início do Exame
//       assessments: [{
//         $currentDate: {assessmentDate: true},
//         breastfeeding: 2,
//         breastfeedingTime: 1,
//         breastfeedingTiredness: 1,
//         breastfeedingSleep: 2,
//         releasingNipple: 1,
//         biteNipple: 1,
//         obsBreastfeeding: "Mama no peito e na mamadeira",
// //Tela 02
//         questionOne: 1,
//         questionTwo: 3,
//         questionThree: 1,
// //Tela 03
//         questionFour: 1,
//         questionFourOne: 1,
//         questionFourTwo: 2,
//         questionFourThree: 1,
//         questionFourComments: 'A língua parece normal e sem alterações visíveis',
// //Tela 04
//         partTwoQuestionOne: 1,
//         partTwoQuestionTwoOne: 1,
//         partTwoQuestionTwoTwo: 1,
//         partTwoQuestionTwoThree: 1,
//         partTwoQuestionTwoFour: 2,
//         obsSuction: 'Mamada normal com pega adequada. Bebê muito esperta',
// //Tela 05
//         obsResume: 'Bebê muito bem e esperta mas a mãe é um porre.',
//         behavior: 2,
//         descBehavior: 'Não precisa ir para a faca, está show de bola',
// //Usuário
//         userCPF: '59621749093',
//         userName: 'Renato',
//         userLastName: 'Sérgio Moreira',
//         userOccupation: 'Fonoaudiólogo Mestre',
//         userRegistry: '02556688'
//       }]
//     }
// );

// patientTest.save(function (err) {
//   if (err){
//     console.log(err);
//   }
// });


module.exports = router;
