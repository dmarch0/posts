const Post = require("../../models/post");
const User = require("../../models/user");

const transformUser = user => {
  return {
    ...user._doc,
    posts: posts.bind(this, user._doc.posts),
    follows: users.bind(this, user._doc.follows),
    followers: users.bind(this, user._doc.followers)
  };
};

const transformPosts = posts => {
  return posts.map(post => ({
    ...post._doc,
    author: singleUser.bind(this, post._doc.author),
    comments: comments.bind(this, post._doc.comments)
  }));
};

const transformPost = post => {
  return {
    ...post._doc,
    author: singleUser.bind(this, post._doc.author),
    comments: comments.bind(this, post._doc.comments)
  };
};

const singleUser = async userId => {
  try {
    const result = await User.findById(userId);
    return {
      ...result._doc,
      posts: posts.bind(this, result._doc.posts),
      follows: users.bind(this, result._doc.follows),
      followers: users.bind(this, result._doc.followers)
    };
  } catch (error) {
    throw error;
  }
};

const users = async userIds => {
  try {
    const result = await User.find({ _id: { $in: userIds } });
    return result.map(user => ({
      ...user._doc,
      posts: posts.bind(this, user._doc.posts),
      follows: users.bind(this, user._doc.follows),
      followers: users.bind(this, user._doc.followers)
    }));
  } catch (error) {
    throw error;
  }
};

const posts = async postsIds => {
  try {
    const result = await Post.find({ _id: { $in: postsIds } });
    return result.map(post => ({
      ...post._doc,
      author: singleUser.bind(this, post._doc.author),
      comments: comments.bind(this, post._doc.comments)
    }));
  } catch (error) {
    throw error;
  }
};

const singlePost = async postId => {
  try {
    const result = await Post.findById(postId);
  } catch (error) {
    throw error;
  }
};

const comments = async comments => {
  return comments.map(comment => ({
    ...comment,
    author: singleUser.bind(this, comment.author)
  }));
};

module.exports = { transformPosts, transformUser, transformPost };
