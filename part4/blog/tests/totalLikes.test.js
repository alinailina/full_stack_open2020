const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
  const singlePostArray = [
    {
      title: "Post 1",
      author: "John Doe",
      url: "http://google.com",
      likes: 5,
    }
  ];

  const multiPostArray = [
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

  test("when list has one post, total likes equals likes of that post", () => {
    const result = totalLikes(singlePostArray);
    expect(result).toBe(5);
  });

  test("when list has many posts, total likes equals sum of all likes", () => {
    const result = totalLikes(multiPostArray);
    expect(result).toBe(9);
  });
});