const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const AssessmentController = require('../controllers/AssessmentController');
const validation = require ('../controllers/Validations');
/*
Página Inicial
- Site do teste da linguinha em si.
- Permite três modos
  1: Modo para inserção de novo paciente ou atualização de paciente e novo exame (caso o paciente já exista.
  2: Modo para edição de um teste existente em paciente já existente (trazendo de início os dados do paciente e do teste em questão pré-preenchidos)
    e permite a atualização dos dados do paciente.
  3: Modo para inserção de novo exame para um paciente já existente (trazendo de início os dados do paciente pré-preenchidos) e também permite
     a atualização dos dados do paciente.
*/

// ROTA GET - Rota para exibição da tela do exame
router.get('/', isLoggedIn, AssessmentController.assessmentCreateGet);

// ROTA CREATE - Rota para inserção de um novo paciente com o primeiro exame no banco
router.post('/', isLoggedIn, validation.validate('assessment'), AssessmentController.assessmentCreatePost);


module.exports = router;
