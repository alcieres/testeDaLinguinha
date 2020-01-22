const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');


/* Página Inicial */
router.get('/', isLoggedIn, function(req, res) {
  res.render('findPatient/findPatient', { title: 'Teste da Linguinha', user: req.user });
});

module.exports = router;
