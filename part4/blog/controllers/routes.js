const blogRouter = require("express").Router();
const Post = require("../models/post");

blogRouter.get("/", (request, response, next) => {
  Post
    .find({})
    .then(blogs => {
      response.json(blogs);
    })
    .catch(error => next(error));
});

blogRouter.post("/", (request, response, next) => {
  const post = new Post(request.body);

  post
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => next(error));
});

module.exports = blogRouter;