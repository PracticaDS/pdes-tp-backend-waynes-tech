
import { Maquina } from './maquina'

const mongoose = require('mongoose');

const celda = mongoose.Schema({
    id: { type: Number },
    maquina: mongoose.Schema.Maquina, // No se si funcionará idFila: {type:Number}, 
    idColumna:{type:Number},
    idFabrica:{type:Number}
});

const Celda = mongoose.model('Celda', celda);

module.exports = Celda;