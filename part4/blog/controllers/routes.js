const router = require("express").Router();
const Post = require("../models/post");

router.get("/", async (request, response) => {
  const posts = await Post.find({});
  response.json(posts);
});

router.post("/", async (request, response, next) => {
  const body = request.body;

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });

  try {
    const savedPost = await post.save();
    response.json(savedPost);
  } catch(exception) {
    next(exception);
  }
});


module.exports = router;