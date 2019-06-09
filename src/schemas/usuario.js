import mongoose, { Schema } from 'mongoose'


const usuario = new Schema({
  id: Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  juegos: [{  type: Schema.Types.ObjectId, ref: 'Juego' }],
  creacion: Date,
  modificacion: Date
}, { timestamps: { createdAt: 'creacion', updatedAt: 'modificacion'}})

export default mongoose.model('Usuario', usuario)