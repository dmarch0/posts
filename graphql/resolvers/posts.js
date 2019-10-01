const Post = require("../../models/post");
const User = require("../../models/user");
const isEmpty = require("../../validation/is-empty");
const { transformPost } = require("./merge");

module.exports = {
  post: async args => {
    try {
      const post = await Post.findById(args.postId);
      if (!post) {
        throw new Error("Post not found");
      }
      const result = await transformPost(post);
      return result;
    } catch (error) {
      //throw new Error("Post not found");
      throw error;
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

      const errors = {};

      if (!args.postInput.title) {
        errors.title = "Title is required";
      }

      if (!args.postInput.text) {
        errors.text = "Text is required";
      }

      if (!isEmpty(errors)) {
        throw new Error(JSON.stringify(errors));
      }

      const post = new Post({
        title: args.postInput.title,
        text: args.postInput.text,
        author: user._id,
        date: Date.now(),
        comments: []
      });

      const result = await post.save();
      user.posts.push(result._id);
      await user.save();
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
      if (!args.commentText) {
        throw new Error("Text is required");
      }
      const newComment = {
        author: user._id,
        text: args.commentText,
        name: user.name,
        avatar: user.avatar,
        date: Date.now()
      };
      post.comments.push(newComment);
      const savedPost = await post.save();
      const result = await transformPost(savedPost);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
