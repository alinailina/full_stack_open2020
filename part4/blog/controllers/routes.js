const router = require("express").Router();
const Post = require("../models/post");

// router.get("/", async (request, response, next) => {
//   try {
//     const posts = await Post.find({});
//     response.json(posts);
//   }
//   catch(exception) {
//     next(exception);
//   }
// });

router.get("/", async (request, response) => {
  const posts = await Post.find({});
  response.json(posts);
});

// router.post("/", async (request, response, next) => {
//   try {
//     const body = request.body;

//     if (body.title === undefined || body.url === undefined) {
//       return response.status(400).json({
//         error: "Title and url are missing",
//       });
//     }

//     const post = new Post({
//       title: body.title,
//       author: body.author,
//       url: body.url,
//       likes: body.likes || 0
//     });

//     const savedPost = await post.save();
//     response.json(savedPost);
//   } catch(exception) {
//     next(exception);
//   }
// });

router.post("/", async (request, response) => {
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({
      error: "Title and url are missing",
    });
  }

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  });

  const savedPost = await post.save();
  response.json(savedPost);
});

router.delete("/:id", async (request, response) => {
  await Post.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedLikes = {
    likes: body.likes || 0
  };

  const updatedAndSavedLikes = await Post.findByIdAndUpdate(request.params.id, updatedLikes, { new: true });
  response.json(updatedAndSavedLikes);
});

module.exports = router;