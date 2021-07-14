const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/isLogged');
const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');
const util = require('util');
const moment = require('moment-timezone');

/* Página de Teste */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('modelo', { title: 'Teste da Linguinha', user: req.user });
});

router.get('/teste', isLoggedIn, function(req, res, next) {
  res.send("Teste");
});
//imprimir JSON
//console.log(util.inspect(req.user, false, null, true /* enable colors */))

let teste =  () => {
    // const aggregate = await Patient.aggregate([{$group: {"_id": "$genre", resultado: {$sum: 1}}}], (err, doc) =>{
    //     console.log(doc);
    // });
    let query = Patient.find();
    let allEmptyFields = true;

    //let name = "Alcieres";
    let initialDate;
    let endDate;


    // if (name) {
    //     query.where('name', {$regex: name, $options: '$i'});
    //     allEmptyFields = false;
    // }
    // if (initialDate) {
    //     let birthDateTomorrow = new Date(birthDate.getTime() + 86400000);
    //     query.where('birthDate', {$gte: birthDate, $lt: birthDateTomorrow});
    //     allEmptyFields = false;
    // }
    // if (endDate) {
    //     let birthDateTomorrow = new Date(birthDate.getTime() + 86400000);
    //     query.where('birthDate', {$gte: birthDate, $lt: birthDateTomorrow});
    //     allEmptyFields = false;
    // }
    // if (gender) {
    //     let assessmentDateTomorrow = new Date(assessmentDate.getTime() + 86400000);
    //     query.where('assessments.assessmentDate', {$gte: assessmentDate, $lt: assessmentDateTomorrow});
    //     allEmptyFields = false;
    // }
    // if (motherName) {
    //     query.where('motherName', {$regex: motherName, $options: '$i'});
    //     allEmptyFields = false;
    // }
    // if (motherCPF) {
    //     query.where('motherCPF', motherCPF);
    //     allEmptyFields = false;
    // }

    // if (allEmptyFields){
    //     res.render('findPatient/patientsList', {patients: "", title: 'Teste da Linguinha', user: req.user, error: [{msg: 'Nenhum paciente encontrado.'}]});
    // }


//     query.sort({name: 1}).exec((err, doc) =>{
//         if (err){
//           console.log("Erro de Acesso ao Banco de Dados");
//       } else {
//       //console.log(doc);
//       if (doc.length === 0){
//         doc = "";
//     }
//     var count = doc.length;
//     console.log(util.inspect(doc, false, null, true /* enable colors */));
//     console.log(util.inspect("Total encontrado: " + count, false, null, true /* enable colors */));
//     }
// });

    const brzl = new Date (1489199400000);

    console.log(util.inspect("Diferença em minutos: " + brzl.getTimezoneOffset(), false, null, true /* enable colors */));

    const dateBrazil = moment.tz(Date.now(), "America/Sao_Paulo");

    console.log(dateBrazil);

    // Patient.findOneAndUpdate(
    //     { "_id": '5fd11c6e3a24ba67b64e84db', "assessments._id": '5fd11c6e3a24ba67b64e84da' },
    //     { 
    //         "$set": {
    //             "assessments.$.assessmentDate": dateBrazil
    //         }
    //     },
    //     function(err,doc) {
    //         if (err){
    //             console.log(err);
    //         } else {
    //             console.log("To aqui 2\n" + doc);
    //         }
    //     });
    let date = new Date(2019, 8, 7);
    console.log(date);
    Patient.find(
    { "birthDate": {
        $gte: new Date(2019, 8, 6), 
        $lt: new Date(2019, 8, 8)
        }
    },
    function(err,doc) {
        if (err){
            console.log(err);
        } else {
            console.log("To aqui 2\n" + doc);
        }
    });

};





//teste();

//console.log(util.inspect(assessment, false, null, true /* enable colors */));




module.exports = router;


/*

https://edrodrigues.com.br/blog/manipulando-o-fuso-horario-em-javascript/

Período do teste
Sexo
Conduta
Profissional
Antecedentes Familiares
Pontuação (maior que e menor que)
Testes concluídos
Testes interrompidos
*/