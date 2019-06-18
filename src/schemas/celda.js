
import { Maquina } from './maquina'

const mongoose = require('mongoose');

const celda = mongoose.Schema({
  maquina: { type: Maquina }, // No se si funcionará
  idFila:{type:Number}, 
  idColumna:{type:Number},
  idFabrica:{type:Number}

});

const Celda = mongoose.model('Celda', celda);

module.exports = Celda;