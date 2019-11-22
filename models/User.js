const mongoose = require('mongoose');
const passportLocalMongoose  = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema ({
  cpf: String,
  name:  String,
  lastName: String,
  occupation: String,
  email: String,
  telephone: String,
  registry: String,
  date: { type: Date, default: Date.now },
  admin: Boolean
  });

//Adiciona os métodos do passport-local em nosso schema
UserSchema.plugin(passportLocalMongoose, {usernameField: "cpf"});

module.exports = mongoose.model("User", UserSchema);