const mongoose = require('mongoose');

const usuario = mongoose.Schema({
  id: { type: Number },
  username: { type: String, require: true },
  fabricas: { type: Array, default: [] }
});

const Usuario = mongoose.model('Usuario', usuario);

module.exports = Usuario;