const Post = require("../models/post");

const initialPosts = [
  {
    "title": "Post title 1",
    "author": "John Doe",
    "url": "https://www.google.com/",
    "likes": 1
  },
  {
    "title": "Post title 2",
    "author": "John Doe",
    "url": "https://www.google.com/",
    "likes": 2
  },
];

const nonExistingId = async () => {
  const post = new Post({
    "title": "NonExistID",
    "author": "John Doe",
    "url": "https://www.google.com/",
    "likes": 2
  });
  await post.save();
  await post.remove();

  return post._id.toString();
};

const notesInDb = async () => {
  const notes = await Post.find({});
  return notes.map(note => note.toJSON());
};

module.exports = {
  initialPosts, nonExistingId, notesInDb
};