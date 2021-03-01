const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const editPatientController = require('../controllers/EditPatientController');
const validation = require ('../controllers/Validations');

//ROTA GET - Rota que exibe a página de edição de dados pessoais de um paciente
router.get('/:id/edit', isLoggedIn, editPatientController.editPatientGet);

// Rota que encaminha os dados alterados de um paciente, sem alterar ou adicionar teste
router.put('/patient/:id', isLoggedIn, validation.validate('patient'), editPatientController.editPatientPut);

//ROTA GET - Rota que abre a página para edição de um paciente e um teste já existente
router.get('/assessmentEdit', isLoggedIn, editPatientController.assessmentEditGet);

//ROTA PUT - Rota que encaminha os dados alterados de um paciente e um exame existente e salva no banco
router.put('/assessmentEdit', isLoggedIn, validation.validate('assessment'), editPatientController.assessmentEditPut);

//ROTA GET - Rota que abre a página para edição de um paciente e um novo teste
router.get('/assessmentNew', isLoggedIn, editPatientController.assessmentNewGet);

//ROTA PUT - Rota que encaminha os dados alterados de um paciente e um exame novo e salva no banco
router.put('/assessmentNew', isLoggedIn, validation.validate('assessment'), editPatientController.assessmentNewPut);

//ROTA GET - Rota que recebe uma requisição de paciente e retorna um paciente com todos os exames
router.get('/requestPatient', isLoggedIn, editPatientController.requestPatientGet);

module.exports = router;