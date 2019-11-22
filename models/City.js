const mongoose = require('mongoose');

const citySchema = new mongoose.Schema ({
  s: String,
  c:  String
}, {
  collation: {
    locale: 'pt',
    strength: 1
  }
});

citySchema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj._id;
  return obj;
};

citySchema.index({ s: 1, c: 1}, {unique: true});

module.exports = mongoose.model("City", citySchema);