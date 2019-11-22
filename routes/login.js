const express = require('express');
const router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/isLogged');

/* GET Login. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.redirect('home');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Teste da Linguinha', message: req.flash('error') });
});
/*

router.post("/login", passport.authenticate("local", {
  successRedirect: "/home", //middleware: código que roda antes de callback da rota
  failureRedirect: "/teste"   //
}), function(req, user, res){
  console.log(req.body.cpf);
  console.log(req.body.password);
});
*/

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : { type: 'error', message: 'CPF ou senha inválidos.' }
    })
);

module.exports = router;
