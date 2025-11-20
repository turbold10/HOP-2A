import { hash } from 'bcrypt'
import { userModel } from '../../schema/user.schema.js'
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export const signup = async (req, res) => {
  const body = req.body

  const { username, password, email } = body
  const saltRound = 10
  const hashedPassword = await hash(password, saltRound)

  const isExisting = await userModel.findOne({ email })

  if (isExisting) {
    res.status(400).json({ message: 'user already exist please use another email' })
  } else {
    const createdUser = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username
    })

    const accessToken = jwt.sign({ data: createdUser }, JWT_SECRET, { expiresIn: '1h' });

    res.json(accessToken)
  }
}