const Patient = require('../models/Patient.js');
const Assessment = require('../models/Assessment.js');

exports.patientDelete = async (req, res) => {

  let patientId = req.params.id;
  patientEdit.name = req.body.inputName;
  patientEdit.birthDate = req.body.inputBirthDate;
  patientEdit.genre = req.body.rbGenre;
  patientEdit.motherName = req.body.inputMotherName;
  patientEdit.motherCPF = req.body.inputMotherCPF;
  patientEdit.fatherName = req.body.inputFatherName;
  patientEdit.address = req.body.inputAddress;
  patientEdit.residenceNumber = req.body.inputResidenceNumber;
  patientEdit.neighborhood = req.body.inputNeighborhood;
  patientEdit.state = req.body.inputState;
  patientEdit.city = req.body.inputCity;
  patientEdit.cep = req.body.inputCEP;
  patientEdit.email = req.body.inputEmail;
  patientEdit.resTel = req.body.inputResTel;
  patientEdit.commercialTel = req.body.inputCommercialTel;
  patientEdit.celPhone = req.body.inputCelPhone;
  console.log(patientEdit);

  Patient.findOneAndUpdate({_id: req.params.id},
      {
        name: patientEdit.name,
        birthDate: patientEdit.birthDate,
        genre: patientEdit.genre,
        motherName: patientEdit.motherName,
        motherCPF: patientEdit.motherCPF,
        fatherName: patientEdit.fatherName,
        address: patientEdit.address,
        residenceNumber: patientEdit.residenceNumber,
        neighborhood: patientEdit.neighborhood,
        state: patientEdit.state,
        city: patientEdit.city,
        cep: patientEdit.cep,
        email: patientEdit.email,
        resTel: patientEdit.resTel,
        commercialTel: patientEdit.commercialTel,
        celPhone: patientEdit.celPhone
      }, function (err, doc) {
        if (err){
          console.log(err);
        } else {
          //console.log(doc);
          res.status(200).json({success: [{msg: "Paciente atualizado com Sucesso"}]});
        }
      })
};

exports.assessmentDelete = function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log("Tô aqui!");
    // console.log(req.body.assessments[0].assessmentDate);
    //console.log(errors.array());
    return res.status(422).json({error: errors.array()});
  }

  let patientEdit = new Patient();
  //Início do Paciente
  patientEdit._id = req.params.id;
  patientEdit.name = req.body.inputName;
  patientEdit.birthDate = req.body.inputBirthDate;
  patientEdit.genre = req.body.rbGenre;
  patientEdit.motherName = req.body.inputMotherName;
  patientEdit.motherCPF = req.body.inputMotherCPF;
  patientEdit.fatherName = req.body.inputFatherName;
  patientEdit.address = req.body.inputAddress;
  patientEdit.residenceNumber = req.body.inputResidenceNumber;
  patientEdit.neighborhood = req.body.inputNeighborhood;
  patientEdit.state = req.body.inputState;
  patientEdit.city = req.body.inputCity;
  patientEdit.cep = req.body.inputCEP;
  patientEdit.email = req.body.inputEmail;
  patientEdit.resTel = req.body.inputResTel;
  patientEdit.commercialTel = req.body.inputCommercialTel;
  patientEdit.celPhone = req.body.inputCelPhone;
  console.log(patientEdit);

  Patient.findOneAndUpdate({_id: req.params.id},
      {
        name: patientEdit.name,
        birthDate: patientEdit.birthDate,
        genre: patientEdit.genre,
        motherName: patientEdit.motherName,
        motherCPF: patientEdit.motherCPF,
        fatherName: patientEdit.fatherName,
        address: patientEdit.address,
        residenceNumber: patientEdit.residenceNumber,
        neighborhood: patientEdit.neighborhood,
        state: patientEdit.state,
        city: patientEdit.city,
        cep: patientEdit.cep,
        email: patientEdit.email,
        resTel: patientEdit.resTel,
        commercialTel: patientEdit.commercialTel,
        celPhone: patientEdit.celPhone
      }, function (err, doc) {
        if (err){
          console.log(err);
        } else {
          //console.log(doc);
          res.status(200).json({success: [{msg: "Paciente atualizado com Sucesso"}]});
        }
      })
};