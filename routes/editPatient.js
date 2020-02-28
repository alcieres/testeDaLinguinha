const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const editPatientController = require('../controllers/EditPatientController');
const validation = require ('../controllers/Validations');

router.get('/:id/edit', isLoggedIn, editPatientController.editPatientGet);

router.put('/patient/:id', isLoggedIn, validation.validate('patient'), editPatientController.editPatientPut);

router.get('/assessmentEdit', isLoggedIn, editPatientController.assessmentEditGet);

router.put('/assessmentEdit', isLoggedIn, /*validation.validate('assessment'),*/ editPatientController.assessmentEditPost);

router.get('/assessmentNew', isLoggedIn, editPatientController.assessmentNewGet);

router.get('/requestPatient', isLoggedIn, editPatientController.requestPatientGet);

module.exports = router;