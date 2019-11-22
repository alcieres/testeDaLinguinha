const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');


/* Página Inicial */
router.get('/period', isLoggedIn, function(req, res, next) {
  res.render('reports/period', { title: 'Teste da Linguinha', user: req.user });
});

router.get('/points', isLoggedIn, function(req, res, next) {
  res.render('reports/points', { title: 'Teste da Linguinha', user: req.user });
});

module.exports = router;
