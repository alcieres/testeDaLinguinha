const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');


/* Página Inicial */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('findPatient', { title: 'Teste da Linguinha', user: req.user });
});

module.exports = router;
