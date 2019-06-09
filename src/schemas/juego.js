import mongoose from 'mongoose'

const juego = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  fabrica: { type: mongoose.Schema.Types.ObjectId, ref: 'Fabrica' },
  creacion: Date,
  modificacion: Date
}, { timestamps: { createdAt: 'creacion', updatedAt: 'modificacion' } })

export default mongoose.model('Juego', juego)