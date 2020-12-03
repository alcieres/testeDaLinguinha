const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const Validation = require ('../controllers/Validations');
const FindPatientController = require('../controllers/FindPatientController');

/* Página Inicial */
router.get('/', isLoggedIn, FindPatientController.findPatientGet);

router.post('/list', isLoggedIn, Validation.validate('find'), FindPatientController.findPatientPost);

router.get('/patients/:id', isLoggedIn, FindPatientController.patientDetails);

module.exports = router;
