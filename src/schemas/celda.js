
import { Maquina } from './maquina'

const mongoose = require('mongoose');

const celda = mongoose.Schema({
  maquina: { type: Maquina }, // No se si funcionará
  idFila:{Number}, 
  idColumna:{Number},
  idFabrica:{Number}

});

const Celda = mongoose.model('Celda', celda);

module.exports = Celda;