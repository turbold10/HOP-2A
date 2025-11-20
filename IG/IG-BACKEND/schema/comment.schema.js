import mongoose, { Schema } from "mongoose"

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  updatedAt: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
})

export const commentModel = mongoose.model('comments', commentSchema)