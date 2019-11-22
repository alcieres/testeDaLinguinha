const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const City = require('../models/City.js');

router.get('/citiesListByState', isLoggedIn, function (req, res, next) {
  let state = req.query.state;

  City.find({s: state},{}, {sort: {c: 1}}, function (err, cities) {
    if (err) {
      console.log(err);
    }
    //console.log(cities);
    res.status(200).json({cities});
  });
});

module.exports = router;