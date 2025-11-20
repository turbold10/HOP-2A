import express from 'express'
import mongoose from 'mongoose'
import { userModel } from './schema/user.schema.js'
import { compare, hash } from 'bcrypt'

const app = express()
app.use(express.json())

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://turbold959:pass1234@hop-2025-1a.v63g3eb.mongodb.net/')
  } catch (error) {
    console.log(error)
  }
}

connectToDB()

//1. User omno n bga esehiig shalgah
//2. Hervee baigaa bol aldaa ugnu ene user bn gsn
//3. Hervee baihgu bol user uusgene

app.post('/sign-up', async (req, res) => {
  const body = req.body

  const email = body.email
  //1. User omno n bga esehiig shalgah
  const existingUser = await userModel.findOne({ email: email })

  if (existingUser) {
    //2. Hervee baigaa bol aldaa ugnu ene user bn gsn
    // throw new Error('email already exist')
    res.status(400).json({ message: 'email already exist' })
  } else {
    // 3. Hervee baihgu bol user uusgene
    const saltRounds = 10
    const hashedPassword = await hash(body.password, saltRounds)
    const createdUser = await userModel.create({
      email: email,
      username: body.username,
      password: hashedPassword
    })

    res.json(createdUser)
  }

})


//1. user bga esehiig shalgana
//2. user oldovol password n zuv esehiig shalgane
//3. password aldaa butsaana.
//4. user oldohgu bol
//5. user bhgu gsn aldaa butsaana
app.post('/login', async (req, res) => {

  // const isSame = await compare('$2b$10$wyxjQnHbBO.PCEAwrXSRbe1I36nhwpZV.Geci0O3RaWfki.FhytGW', 'lord12')
  const isSame = await compare('lord12', '$2b$10$wyxjQnHbBO.PCEAwrXSRbe1I36nhwpZV.Geci0O3RaWfki.FhytGW')

  console.log(isSame)
  res.json('helo')
})

app.listen(5555, () => {
  console.log('app is running on port 5555 http://localhost:5555')
})