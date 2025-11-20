import { postModel } from "../../schema/post.schema.js"

export const getUserPost = async (req, res) => {
  const userId = req.params.userId

  const userPosts = await postModel.find({ user: userId })

  res.status(200).json(userPosts)
} 