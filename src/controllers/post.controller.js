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

updatePost = async function (req, res) {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    const updatedPost = await Post.findById(req.params.id);
    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

votePost = async function (req, res) {
  try {
    let isValidObjectId = false;
    if (require("mongoose").Types.ObjectId.isValid(req.params.id)) {
      if (await Post.findById(req.params.id)) {
        isValidObjectId = true;
      }
    }
    if (!isValidObjectId) {
      res.status(404).send("You sent invalid PostId!");
    } else {
      if (req.body.type == "like") {
        await Post.findByIdAndUpdate(req.params.id, {
          $inc: { quantity: +1, "vote.like.count": 1 },
          $push: { "vote.like.users": req.body.username },
        });
        const updatedPost = await Post.findById(req.params.id);
        res.status(200).send(updatedPost);
      } else if (req.body.type == "dislike") {
        await Post.findByIdAndUpdate(req.params.id, {
          $inc: { quantity: -1, "vote.dislike.count": 1 },
          $push: { "vote.dislike.users": req.body.username },
        });
        const updatedPost = await Post.findById(req.params.id);
        res.status(200).send(updatedPost);
      } else {
        res.status(500).send("unknow vote type!");
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

searchPosts = async function (req, res) {
  try {
    // new RegExp(req.query.search, "g")
    const posts = await Post.find({
      $text: { $search: req.query.search },
    })
      .limit(req.query.limit)
      .skip(req.query.offset)
      .exec();
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createPost: createPost,
  readPosts: readPosts,
  readPost: readPost,
  deletePost: deletePost,
  updatePost: updatePost,
  votePost: votePost,
  searchPosts: searchPosts,
};
