const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    keywords: [String],
    author: { type: String, required: true },
    vote: {
      like: { count: { type: Number, default: 0 }, users: [String] },
      dislike: { count: { type: Number, default: 0 }, users: [String] },
    },
  },
  { timestamps: true }
);

module.exports = model("Post", PostSchema);
