
import { Maquina } from './maquina'

const mongoose = require('mongoose');

const celda = mongoose.Schema({
    id: { type: Number },
    maquina: Maquina, // No se si funcionará idFila: {type:Number}, 
    idColumna:{type:Number},
    idFila:{type:Number}
});

const Celda = mongoose.model('Celda', celda);

module.exports = Celda;