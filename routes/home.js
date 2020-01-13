const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');


/* Página Inicial */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('home', { title: 'Teste da Linguinha', user: req.user });
});

router.get('/teste', function(req, res, next) {
  res.send("Teste");
});

module.exports = router;
