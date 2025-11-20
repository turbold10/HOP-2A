import { commentModel } from "../../schema/comment.schema.js";

export const getPostComments = async (req, res) => {
  const postId = req.params.postId;

  const comments = await commentModel
    .find({
      post: postId,
    })
    .populate({
      path: "post",
      populate: { path: "user", select: "username profilePicture" },
    })
    .populate("user", "username profilePicture");

  res.status(200).json(comments);
};
