const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

/* Página Inicial */
router.get('/changePassword', isLoggedIn, function(req, res, next) {
  res.render('user/changePassword', { title: 'Teste da Linguinha', user: req.user });
});

router.put("/changePassword",
    isLoggedIn,
    [
      check("inputOldPassword", "Senha inválida.")
          .exists().withMessage('O campo "Senha Antiga" é obrigatório')
          .not().isEmpty().withMessage('O campo "Senha Antiga" é obrigatório')
          .isLength({ min: 6, max: 16 }).withMessage('A senha antiga deve ter entre 6 e 16 caracteres.'),
      check("inputPassword", "Nova senha inválida.")
          .exists().withMessage('O campo "Nova Senha" é obrigatório')
          .not().isEmpty().withMessage('O campo "Nova Senha" é obrigatório')
          .isLength({ min: 6, max: 16 }).withMessage('A nova senha deve ter entre 6 e 16 caracteres.')
          .custom(
              (value, {req}) => {
                if (value !== req.body.inputPasswordConfirm) {
                  throw new Error("A nova senha diverge entre os dois campos.");
                } else {
                  return value;
                }
              })
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ error: errors.array() });
      }

      let oldPassword = req.body.inputOldPassword;
      let password = req.body.inputPassword;
      let user = req.user;
        User.findById(req.params.id, function (err, doc) {
          if (err) {
            console.log(err);
            res.json({ error: [{msg: 'Erro de acesso ao banco de dados.'}]});
          } else {
            user.changePassword(oldPassword, password, function(err) {
              if (err) {
                console.log(err);
                res.status(422).json({error: [{msg: 'A senha digitada está incorreta'}]});
              } else {
                res.status(200).json({ success: {msg: 'Senha reinicializada com sucesso.'}});
              }
              });
          }
        });
    });

module.exports = router;
