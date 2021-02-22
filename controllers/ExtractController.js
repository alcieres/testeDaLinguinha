const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');

// Exibe página com o extrato de um determinado exame
exports.assessmentExtractGet = function (req, res) {
  let patientId = req.query.patientId;
  let assessmentId = req.query.assessmentId;
  res.render('assessment/assessmentExtract', {title: 'Teste da Linguinha', user: req.user, patientId, assessmentId});
};

// Busca determinado paciente e exame no banco e retorna JSON com esses dados
exports.assessmentRequestGet = function (req, res) {
  let patientIdReq = req.query.patient.trim();
  let assessmentIdReq = req.query.assessment.trim();
  Patient.findById(patientIdReq, function (err, patientDB) {
    if (err) {
      console.log(err);
    } else {
      let patientSend = JSON.parse(JSON.stringify(patientDB));
      patientSend.assessments.splice(0, patientSend.assessments.length);
      let assessmentIndex = patientDB.assessments.findIndex(assessment => assessment._id.equals(assessmentIdReq));
      patientSend.assessments.push(patientDB.assessments[assessmentIndex]);
      res.status(200).json({patient: patientSend});
    }
  });
};
