const { Post } = require("../models");

createPost = async function (req, res) {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      keywords: req.body.keywords,
      author: "me",
    });
    await post.save();
    res.status(200).send("successfully saved post");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createPost: createPost,
};
