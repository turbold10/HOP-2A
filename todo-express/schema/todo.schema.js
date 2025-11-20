import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  isDone: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now() },
  userId: { type: Schema.Types.ObjectId, ref: 'users' }
})


export const todoModel = mongoose.model('todos', todoSchema)