import express from 'express'
import { getPosts } from '../../controller/post/get-posts.js'
import { createPost } from '../../controller/post/create-post.js'
import { authMiddleware } from '../../middleware/auth-middleware.js'
import { togglePostLike } from '../../controller/post/toggle-post-like.js'
import { getUserPost } from '../../controller/post/get-user-post.js'

const postRouter = express.Router()

postRouter.get('/all-posts', authMiddleware, getPosts)
postRouter.post('/create', authMiddleware, createPost)
postRouter.post('/toggle-like/:postId', authMiddleware, togglePostLike)
postRouter.get('/user-posts/:userId', authMiddleware, getUserPost)


export default postRouter