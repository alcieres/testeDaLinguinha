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
      check('name', 'Os dados do campo "Nome" são inválidos.')
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
      check('birthDate', 'A data de nascimento é inválida.')
          .isISO8601({strict: true}),
      check('assessments[0].assessmentDate', 'A data do teste é inválida.')
          .isISO8601({strict: true}),
      check('genre', 'O campo "Gênero" é inválido.')
          .exists().withMessage('O campo "Gênero" é obrigatório.')
          .isInt({min: 1, max: 2}),
      check('motherName', 'Os dados do campo "Nome da Mãe" são inválidos.')
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
      check('motherCPF', 'Os dados do campo "CPF da Mãe" são inválidos.')
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
      check('fatherName', 'Os dados do campo "Nome do Pai" são inválidos')
          .optional({ checkFalsy: true })
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
      check('address', 'Os dados do campo "Endereço" são inválidos')
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
      check('residenceNumber', 'Os dados do campo "Nome" são inválidos')
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
      check('neighborhood', 'Os dados do campo "Bairro" são inválidos')
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
      check('state', 'Os dados do campo "Estado" são inválidos')
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
      check('city', 'Os dados do campo "Cidade" são inválidos')
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
      check('cep', 'Os dados do campo "CEP" são inválidos.')
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
      check('email', 'Os dados do campo "E-mail" são inválidos')
          .optional({ checkFalsy: true })
          .isEmail().withMessage('O campo "E-mail" é inválido')
          .normalizeEmail()
          .customSanitizer(
              (value) => {
                return value === '@' ? '' : value;
              }
          ),
      check('resTel', 'Os dados do campo "Telefone Residencial" são inválidos')
          .optional({checkFalsy: true})
          .blacklist('()-\\s')
          .trim()
          .isLength({min: 10, max: 11}).withMessage('O campo "Telefone Residencial" deve ter entre 10 e 11 dígitos')
          .isInt(),
      check('commercialTel', 'Os dados do campo "Telefone Comercial" são inválidos')
          .optional({checkFalsy: true})
          .blacklist('()-\\s')
          .trim()
          .isLength({min: 10, max: 11}).withMessage('O campo "Telefone Comercial" deve ter entre 10 e 11 dígitos')
          .isInt()
          .escape(),
      check('celPhone', 'Os dados do campo "Telefone Celular" são inválidos')
          .optional({checkFalsy: true})
          .blacklist('()-\\s')
          .trim()
          .isLength({min: 11, max: 11}).withMessage('O campo "Telefone Celular" deve ter 11 dígitos')
          .isInt().withMessage('O campo "Telefone Celular" deve ser composto somente por números')
          .escape(),
      check('familyHistory', 'Os dados do campo "Antecedentes Familiares" são inválidos')
          .isIn(['1', '2', undefined]),
      check('problemDescription', 'Os dados do campo "Quem e qual o problema" são inválidos')
          .trim()
          .isLength({min: 0, max: 1000}).withMessage('O campo "Quem e qual o problema" pode ter no máximo 1000 caracteres')
          .escape(),
      check('patientHealthProblem', 'Os dados do campo "Problemas de Saúde" são inválidos')
          .isIn(['1', '2', undefined]),
      check('healthProblemDescription', 'Os dados do campo "Quem e qual o problema" são inválidos')
          .trim()
          .isLength({min: 0, max: 1000}).withMessage('O campo "Quem e qual o problema" pode ter no máximo 1000 caracteres')
          .escape(),
      check('assessments[0].breastfeeding', 'Os dados do campo "Mama no Peito?" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('assessments[0].breastfeedingTime', 'Os dados do campo "Tempo entre as mamadas" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].breastfeedingTiredness', 'Os dados do campo "Cansaço para mamar?" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].breastfeedingSleep', 'Os dados do campo "Mama um pouquinho e dorme?" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].releasingNipple', 'Os dados do campo "Vai soltando o mamilo?" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].biteNipple', 'Os dados do campo "Morde o mamilo?" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].obsBreastfeeding', 'Os dados do campo "Observações" da pergunta "Mama no Peito?" são inválidos')
          .trim()
          .isLength({max: 1000}).withMessage('pode ter no máximo 1000 caracteres')
          .escape(),

      //Pontuação da História Clínica
      check('assessments[0].clinicalHistoryPoints', 'A pontuação da "História Clínica" é inválida')
          .isNumeric(),

      check('assessments[0].questionOne', 'Os dados da questão "1. Postura dos lábios em repouso" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('assessments[0].questionTwo', 'Os dados da questão "2. Tendência do posicionamento da língua durante o choro" são inválidos')
          .isIn(['1', '2', '3', '4', undefined]),
      check('assessments[0].questionThree', 'Os dados da questão "3. Forma da ponta da língua quando elevada durante o choro" são inválidos')
          .isIn(['1', '2', '3', undefined]),

      //Pontuação das Questões de Um a Três
      check('assessments[0].questionsOneToThreePoints', 'A pontuação das questões 1 a 3 é inválida')
          .isNumeric(),

      check('assessments[0].questionFour', 'Os dados da questão "4. Frênulo da língua" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('assessments[0].questionFourOne', 'Os dados da questão "4.1. Espessura do frênulo" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].questionFourTwo', 'Os dados da questão "4.2. Fixação do frênulo na face sublingual (ventral) da língua" são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('assessments[0].questionFourThree', 'Os dados da questão "4.3. Fixação do frênulo no assoalho da boca" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].questionFourComments', 'Os dados do campo "Observações" da "Parte I" são inválidos')
          .trim()
          .isLength({max: 1000}).withMessage('O campo "Observações" da "Parte I" pode ter no máximo 1000 caracteres')
          .escape(),

      //Inserir Pontuação da Questão 4
      check('assessments[0].questionFourPoints', 'A pontuação da questão 4 é inválida')
          .isNumeric(),

      //Inserir Pontuação da Parte I
      check('assessments[0].questionsOneToFourPoints', 'A pontuação das questões 1 a 4 é inválida')
          .isNumeric(),

      check('assessments[0].partTwoQuestionOne', 'Os dados da questão "1.1 Movimento da língua" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].partTwoQuestionTwoOne', 'Os dados da questão "2.1 Ritmo da sucção" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].partTwoQuestionTwoTwo', 'Os dados da questão "2.2 Coordenação entre sucção/deglutição/respiração" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].partTwoQuestionTwoThree', 'Os dados da questão "2.3 "Morde" o mamilo" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].partTwoQuestionTwoFour', 'Os dados da questão "2.4 Estalos de língua durante a sucção" são inválidos')
          .isIn(['1', '2', undefined]),
      check('assessments[0].obsSuction', 'Os dados do campo "Observações" da "Parte II" são inválidos')
          .trim()
          .isLength({min: 0, max: 1000}).withMessage('O campo "Observações" da "Parte II" pode ter no máximo 1000 caracteres')
          .escape(),

      //Inserir Pontuação da Parte II
      check('assessments[0].partTwoQuestionPoints', 'A pontuação da "Parte II" é inválida')
          .isNumeric(),

      //Inserir Pontos Totais Exame Clínico
      check('assessments[0].clinicalAssessmentPoints', 'A pontuação do "Exame Clínico" é inválida')
          .isNumeric(),

      //Inserir Pontos Totais do Exame
      check('assessments[0].historyAssessmentPoints', 'A pontuação total do exame é inválida')
          .isNumeric(),

      check('assessments[0].obsResume', 'Os dados do campo "Observações" do "Resumo Final" são inválidos')
          .trim()
          .isLength({max: 1000}).withMessage('O campo "Observações" do "Resumo Final" pode ter no máximo 1000 caracteres')
          .escape(),
      check('assessments[0].assBehavior', 'Os dados da questão "CONDUTA" no Resumo Final são inválidos')
          .isIn(['1', '2', '3', undefined]),
      check('assessments[0].descBehavior', 'Os dados do campo "Observações" do "Resumo Final" são inválidos')
          .trim()
          .isLength({max: 100}).withMessage('O campo "Descrição da conduta" do "Resumo Final" pode ter no máximo 100 caracteres')
          .escape()
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //console.log("Tô aqui!");
       // console.log(req.body.assessments[0].assessmentDate);
        console.log(errors.array());
        return res.status(422).json({error: errors.array()
        });
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
                  console.log("ARRAY IDS: " + 'patientId = ' + updatedDocsIds[0] + ' e assessmentId = ' + updatedDocsIds[1]);
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
  console.log("Body do Extrato: " + req.query.patientId);
  let patientId = req.query.patientId;
  let assessmentId = req.query.assessmentId;

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
    return [patientDB._id, patientDB.assessments[0]._id];
  } else {
    let assessmentIndex = patientDB.assessments.findIndex(assessment => assessment._id === patientForUpdate.assessments[0]._id);
    patientDB.assessments[assessmentIndex] = patientForUpdate.assessments[0];
    await patientDB.save();
    return [patientDB._id, patientDB.assessments[assessmentIndex]._id];
  }
}

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
//         assBehavior: 2,
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
