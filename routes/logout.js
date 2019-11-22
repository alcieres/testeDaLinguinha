const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');


/* Página Inicial */
router.get('/', isLoggedIn, function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
