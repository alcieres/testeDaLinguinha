var express = require('express');
var router = express.Router();

/* Página Inicial */
router.get('/', function(req, res, next) {
  res.render('teste', { title: 'Teste da Linguinha' });
});

router.get('/teste', function(req, res, next) {
  res.send("Teste");
});

module.exports = router;
