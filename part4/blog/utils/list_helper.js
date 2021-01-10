const totalLikes = (posts) => {
  const likesArray = posts.map(post => post.likes);
  const reducer = (sum, item) => {
    return sum + item;
  };
  return likesArray.reduce(reducer, 0);
};

const favouritePost = (posts) => {
  // console.log(posts);
  // const likesArray = posts.map(post => post.likes);
  // return Math.max(...likesArray);
  return posts.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  });
};

module.exports = {
  totalLikes,
  favouritePost
};