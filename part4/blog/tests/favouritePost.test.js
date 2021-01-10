const favouritePost = require("../utils/list_helper").favouritePost;

describe("favourite post", () => {
  const posts = [
    {
      title: "Post 1",
      author: "John Doe",
      url: "http://google.com",
      likes: 5,
    },
    {
      title: "Post 2",
      author: "John Doe",
      url: "http://google.com",
      likes: 3,
    },
    {
      title: "Post 3",
      author: "John Doe",
      url: "http://google.com",
      likes: 1,
    },
  ];

  test("favourite post", () => {
    const result = favouritePost(posts);
    expect(result).toEqual({
      title: "Post 1",
      author: "John Doe",
      url: "http://google.com",
      likes: 5,
    });
  });
});