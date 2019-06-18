const mongoose = require('mongoose');

const maquina = mongoose.Schema({
  id: { type: Number },
  direccion: {type:String},
  imagen: {type: String}, // todavia no se como poner una imagen
  materiales: {type:Number}
});

const Maquina = mongoose.model('Maquina', maquina);

module.exports = Maquina;
