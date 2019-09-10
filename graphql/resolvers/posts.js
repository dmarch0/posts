const Post = require("../../models/post");
const User = require("../../models/user");

module.exports = {
  post: async args => {
    try {
      const post = await Post.findById(args.postId);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw new Error("Post not found");
    }
  },
  addPost: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const user = await User.findById(req.user);
      if (!user) {
        throw new Error("Token incorrect");
      }
      const post = new Post({
        title: args.postInput.title,
        text: args.postInput.text,
        author: user._id,
        date: Date.now(),
        comments: []
      });
      const result = await post.save();
      return result;
    } catch (error) {
      throw error;
    }
  },
  deletePost: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const user = await User.findById(req.user);
      if (!user) {
        throw new Error("User not found");
      }
      const post = await Post.findById(args.postId);
      if (!post) {
        throw new Error("Post not found");
      }
      if (post.author.toString() !== user._id.toString()) {
        throw new Error("Unauthorized");
      }
      const result = await Post.findByIdAndDelete(args.postId);
      return result;
    } catch (error) {
      throw error;
    }
  },
  commentPost: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const user = await User.findById(req.user);
      if (!user) {
        throw new Error("User not found");
      }
      const post = await Post.findById(args.postId);
      if (!post) {
        throw new Error("Post not found");
      }
      const newComment = {
        author: user._id,
        text: args.commentText,
        name: user.name,
        avatar: user.avatar,
        date: Date.now()
      };
      post.comments.push(newComment);
      const result = await post.save();
      return result;
    } catch (error) {
      throw error;
    }
  }
};
