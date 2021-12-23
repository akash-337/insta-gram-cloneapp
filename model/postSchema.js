const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
  {
    userID: {
      type: ObjectId,
      ref: "USER",
    },
    username: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    // likes: [{ type: ObjectId, ref: "USER" }],
    comments: [
      {
        userID: { type: ObjectId, ref: "USER" },
        username: { type: String, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
