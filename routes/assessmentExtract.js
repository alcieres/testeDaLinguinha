const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const ExtractController = require('../controllers/ExtractController');
const validation = require ('../controllers/Validations');


//ROTA GET (Extrato) - Rota que abre o extrato resumido de um teste para visualização e impressão
router.get('/', isLoggedIn, ExtractController.assessmentExtractGet);

/*ROTA GET - Essa rota recebe uma requisição de um teste de um determinado paciente, procura o paciente no banco 
e envia os dados pessoais do paciente juntamente com os dados do exame requerido em formato JSON*/
router.get('/patient/requestAssessment', isLoggedIn, ExtractController.assessmentRequestGet);



module.exports = router;