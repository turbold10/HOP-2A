import { compare } from 'bcrypt'
import { userModel } from '../../schema/user.schema.js'
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const body = req.body

  const JWT_SECRET = process.env.JWT_SECRET

  const { email, password } = body

  const user = await userModel.findOne({ email })

  if (user) {
    const hashedPassword = user.password
    const isValid = await compare(password, hashedPassword)
    if (isValid) {
      const accessToken = jwt.sign({
        data: user
      }, JWT_SECRET, { expiresIn: '1h' });

      res.json(accessToken)
    } else {
      res.status(404).json({ message: "wrong password!" })
    }
  } else {
    res.status(404).json({ message: "need to register" })
  }
}