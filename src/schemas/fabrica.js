const mongoose = require('mongoose');

const fabrica = mongoose.Schema({
  id: { type: Number },
  username: { type: String, require: true },
  celdas: { type: Array, default: [] }
});

const Fabrica = mongoose.model('Fabrica', fabrica);

module.exports = Fabrica;