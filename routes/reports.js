const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');

/* Página Inicial */
router.get('/period', isLoggedIn, function(req, res, next) {
  res.render('reports/period', { title: 'Teste da Linguinha', user: req.user });
});

router.get('/points', isLoggedIn, function(req, res, next) {
  res.render('reports/points', { title: 'Teste da Linguinha', user: req.user });
});

let teste = async () => {
  const aggregate = await Patient.aggregate([{$group: {"_id": "$genre", resultado: {$sum: 1}}}], (err, doc) =>{
    console.log(doc);
  });

};

teste();


module.exports = router;
