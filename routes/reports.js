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

module.exports = router;

/*
Relatório por data

data inicial do exame
data final do exame
data de nascimento inicial
data de nascimento final
Gênero
Conduta
--------------------------------
Listar pacientes com link para ele e para o exame
Quantidade total de ocorrências

-*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*-

PARTE I - AVALIAÇÃO ANATOMOFUNCIONAL
Inicial e final
PARTE II - AVALIAÇÃO DA SUCÇÃO NÃO NUTRITIVA E NUTRITIVA
Inicial e final
TOTAL
Inicial e final
--------------------------------
Listar pacientes com link para ele e para o exame
Quantidade total de ocorrências
 */