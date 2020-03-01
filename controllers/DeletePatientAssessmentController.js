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

exports.assessmentDelete = function(req, res) {

};