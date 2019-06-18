const mongoose = require('mongoose');

const maquina = mongoose.Schema({
  tipoMaquina: { type: String },
  direccion: {type:String},
  imagen: {type: String}, // todavia no se como poner una imagen
  materiales: {type:String}
});

const Maquina = mongoose.model('Maquina', maquina);

module.exports = Maquina;
