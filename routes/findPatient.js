const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');

/* Página Inicial */
router.get('/', isLoggedIn, function(req, res) {
  res.render('findPatient/findPatient', { title: 'Teste da Linguinha', user: req.user });
});

async function findPatients (){
  let name = "PEDRINHO PEDROSO";
  let birthDate = new Date(2020, 1, 1);
  let motherName = "PETRA ALVES";
  let motherCPF = "00531540022";
  let assessmentDate = new Date(2020,1,13);

  let query = Patient.find();

  // if (name !== "") {
  //   query.where('name', name)
  // }

  if (true) {
    query.where('assessments.assessmentDate', {$gte: new Date('2020-01-13'), $lt: new Date('2020-01-14')});
  }

  // if (true) {
  //   query.where('birthDate', new Date ('2020-01-01'));
  // }

  // and then to run the query
  const result = await query.exec();

  console.log(result);
  console.log(new Date('2020-01-14'))
}

findPatients();

module.exports = router;
