import express from 'express'
import { signup } from '../../controller/user/sign-up.js'
import { login } from '../../controller/user/login.js'
import { authMiddleware } from '../../middleware/auth-middleware.js'
import { followUser } from '../../controller/user/follow-user.js'
import { getUserInfo } from '../../controller/user/get-user-info.js'
import { getUsers } from '../../controller/user/get-users.js'

const userRouter = express.Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post('/follow-toggle/:followedUserId', authMiddleware, followUser)
userRouter.get('/user-info/:userId', authMiddleware, getUserInfo)
userRouter.get('/users/:searchParam', authMiddleware, getUsers)

export default userRouter