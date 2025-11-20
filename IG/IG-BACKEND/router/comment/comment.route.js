import express from 'express'
import { createComment } from '../../controller/comment/create-comment.js'
import { authMiddleware } from '../../middleware/auth-middleware.js'
import { getPostComments } from '../../controller/comment/get-post-comments.js'

const commentRouter = express.Router()

commentRouter.post('/create', authMiddleware, createComment)
commentRouter.get('/get/:postId', authMiddleware, getPostComments)

export default commentRouter