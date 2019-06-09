import mongoose from 'mongoose'

const maquina = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  direccion: String,
  tipoMaquina: String,
  creacion: Date,
  modificacion: Date
}, { timestamps: { createdAt: 'creacion', updatedAt: 'modificacion' } })
export default mongoose.model('Maquina', maquina)
