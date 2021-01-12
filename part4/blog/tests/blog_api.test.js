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

  for (let post of initialPosts) {
    let postObject = new Post(post);
    await postObject.save();
  }
});

describe ("if posts", () => {
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

  test("a specific post title is within is within returned posts", async () => {
    const response = await api.get("/api/posts");

    const titles = response.body.map(response => response.title);
    // console.log(title);
    expect(titles).toContain(
      "Post title 1"
    );
  });

});

describe ("creating new posts", () => {
  test("succeeds with valid data", async () => {
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

    const titles = response.body.map(response => response.title);

    expect(response.body).toHaveLength(initialPosts.length + 1);
    expect(titles).toContain(
      "New post"
    );
  });

  test("fails with status code 400 if data is invaild", async () => {
    const newPost =  {
      "author": "John Doe"
    };

    await api
      .post("/api/posts")
      .send(newPost)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/posts");

    expect(response.body).toHaveLength(initialPosts.length);
  });

  test("undefined likes default to 0", async () => {
    const newPost =  {
      "title": "Post without likes",
      "author": "John Doe",
      "url": "https://www.google.com/"
    };

    await api
      .post("/api/posts")
      .send(newPost)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/posts");

    const titles = response.body.map(response => response.title);

    expect(response.body).toHaveLength(initialPosts.length + 1);
    // console.log(response.body);
    expect(response.body[2].likes).toBe(
      0
    );
    expect(titles).toContain(
      "Post without likes"
    );
  });
});

describe ("deleting a blog post", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const postsAtStart = await Post.find({});
    const postToDelete = postsAtStart[0];

    await api
      .delete(`/api/posts/${postToDelete.id}`)
      .expect(204);

    const postsAtEnd = await Post.find({});

    expect(postsAtEnd).toHaveLength(
      initialPosts.length - 1
    );

    const titles = postsAtEnd.map(response => response.content);

    expect(titles).not.toContain(postToDelete.title);
  });
});

test("unique identifier property of a post is named id", async () => {
  const response = await api.get("/api/posts");

  expect(response.body[0].id).toBeDefined();
  expect(response.body[1].id).toBeDefined();
});

test("likes are updated", async () => {
  const postsAtStart = await Post.find({});
  const postToUpdateLikes = postsAtStart[0];

  const newLikes =  {
    "likes": 10
  };
  await api
    .put(`/api/posts/${postToUpdateLikes.id}`)
    .send(newLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const postsAtEnd = await Post.find({});

  expect(postsAtEnd[0].likes).toBe(10);
});

afterAll(() => {
  mongoose.connection.close();
});