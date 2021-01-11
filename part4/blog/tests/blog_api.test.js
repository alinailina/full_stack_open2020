const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

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

beforeEach(async () => {
  await Post.deleteMany({});

  const posts = initialPosts
    .map(post => new Post(post));
  const promiseArray = posts.map(post => post.save());
  await Promise.all(promiseArray);
});

test("posts are returned as json", async () => {
  await api
    .get("/api/posts")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blog posts", async () => {
  const response = await api.get("/api/posts");

  expect(response.body).toHaveLength(initialPosts.length);
});

test("Post title 1 is within returned posts", async () => {
  const response = await api.get("/api/posts");

  const title = response.body.map(response => response.title);
  // console.log(title);
  expect(title).toContain(
    "Post title 1"
  );
});

test("a valid post can be added", async () => {
  const newPost =  {
    "title": "New post",
    "author": "John Doe",
    "url": "https://www.google.com/",
    "likes": 2
  };
  await api
    .post("/api/posts")
    .send(newPost)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/posts");

  const title = response.body.map(response => response.title);

  expect(response.body).toHaveLength(initialPosts.length + 1);
  expect(title).toContain(
    "New post"
  );
});

afterAll(() => {
  mongoose.connection.close();
});