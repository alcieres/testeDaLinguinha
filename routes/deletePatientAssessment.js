const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const deleteController = require('../controllers/DeletePatientAssessmentController');

//Deleta um paciente
router.delete('/patient/:id', isLoggedIn, deleteController.patientDelete);
//Deleta um teste de um paciente
router.delete('/patient/:id/assessment/:id', isLoggedIn, deleteController.assessmentDelete);

module.exports = router;