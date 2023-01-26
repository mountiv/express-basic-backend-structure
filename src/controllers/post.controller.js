const { Post } = require("../models");

createPost = async function (req, res) {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      keywords: req.body.keywords,
      author: req.body.username,
    });
    await post.save();
    res.status(200).send("successfully saved post");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

readPosts = async function (req, res) {
  try {
    const posts = await Post.find({})
      .limit(req.query.limit)
      .skip(req.query.offset)
      .exec();
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

readPost = async function (req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

deletePost = async function (req, res) {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createPost: createPost,
  readPosts: readPosts,
  readPost: readPost,
  deletePost: deletePost,
};
