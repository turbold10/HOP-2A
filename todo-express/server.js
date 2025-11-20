import express from 'express'
import mongoose from 'mongoose'
import { todoModel } from './schema/todo.schema.js'
import cors from 'cors'
import { userModel } from './schema/user.schema.js'

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 5555

const connectToDB = async () => {
  await mongoose.connect('mongodb+srv://turbold959:pass1234@hop-2025-1a.v63g3eb.mongodb.net/')
}

connectToDB()

app.get('/todos', async (_req, res) => {
  const todos = await todoModel.find()
  res.json(todos)
})

app.post('/todo', async (req, res) => {

  const body = req.body

  const taskName = body.name
  const isDone = body.isDone

  const createdTodo = await todoModel.create({
    task: taskName,
    isDone: isDone
  })

  res.json({ message: 'done!' })
})

app.get('/user/todos/:userId', async (req, res) => {
  const params = req.params
  const userId = params.userId

  const todos = await todoModel.find({
    userId: userId
  }).populate('userId')


  res.json(todos)
})

app.delete('/delete/todo/:todoId', async (req, res) => {
  const params = req.params
  const todoId = params.todoId

  const deletedTodo = await todoModel.findByIdAndDelete(todoId)

  res.json(deletedTodo)
})


app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})