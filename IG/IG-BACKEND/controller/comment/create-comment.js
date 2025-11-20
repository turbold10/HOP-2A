import { commentModel } from "../../schema/comment.schema.js"

export const createComment = async (req, res) => {
  const userId = req.user._id
  const { postId, comment } = req.body

  const createdComment = await commentModel.create({
    user: userId,
    post: postId,
    comment
  })

  res.status(200).json(createdComment)
}