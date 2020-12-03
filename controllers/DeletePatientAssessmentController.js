const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');

exports.patientDelete = async (req, res) => {
  let patientId = req.params.id;
  let deletedPatient = await Patient.findOneAndDelete({_id: patientId}, (err) => {
    if (err){
      console.log(err);
      return res.status(422).json({error: [{msg: 'Erro ao deletar paciente'}]});
    }
  });
  console.log(deletedPatient);
  res.status(200).json({success: [{msg: "Paciente deletado com sucesso!"}]});

};

exports.assessmentDelete = async function(req, res) {
  let patientId = req.params.idPatient;
  let assessmentId = req.params.idAssessment;

  console.log('Patient Id: ' + patientId + '\nAssessmentId: ' + assessmentId);

  await Patient.findById({_id: patientId}, (err, patient) => {
    if (err){
      return res.status(422).json({error: [{msg: 'Erro ao deletar teste'}]});
    } else {
      patient.assessments.id({_id: assessmentId}).remove();
      patient.save((err) =>{
        if(err){
          return res.status(422).json({error: [{msg: 'Erro ao deletar teste'}]});
        } else {
          res.status(200).json({success: [{msg: "Teste deletado com sucesso!"}]});
        }
      });
    }
  });

};