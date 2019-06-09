import mongoose, { Schema } from 'mongoose'

const tipoMaquina = new Schema({
  id: Schema.Types.ObjectId,
  maquina: { type: Schema.Types.ObjectId, ref: 'Maquina' },
  materiales: [{
    materialId: String,
    cantidad: Number
  }],
  creacion: Date,
  modificacion: Date
}, { timestamps: { createdAt: 'creacion', updatedAt: 'modificacion'}})

export default mongoose.model('tipoMaquina', tipoMaquina)