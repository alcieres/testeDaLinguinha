const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');


/* Página Inicial */
router.get('/', isLoggedIn, function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
