import { userModel } from "../../schema/user.schema.js"

export const getUsers = async (req, res) => {
  const searchParam = req.params.searchParam

  const users = await userModel.find({ username: new RegExp(searchParam, 'i') })

  res.status(200).json(users)
}
