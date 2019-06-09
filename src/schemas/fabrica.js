import mongoose, { Schema } from 'mongoose'

const fabrica = new Schema({
  id: Schema.Types.ObjectId,
  tamanio: { n: Number, m: Number },
  fabrica: [[{  type: Schema.Types.ObjectId, ref: 'tipoMaquina' }]],
  creacion: Date,
  modificacion: Date
}, { timestamps: { createdAt: 'creacion', updatedAt: 'modificacion'}})

export default mongoose.model('Fabrica', fabrica)