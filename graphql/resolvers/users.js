const User = require("../../models/user");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const isEmpty = require("../../validation/is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  //user(userId: ID, handle: String): User!
  user: async args => {
    try {
      let user;
      if (args.userId) {
        user = await User.findById(args.userId);
      } else if (args.handle) {
        user = await User.findOne({ handle: args.handle });
      }
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("User not found");
    }
  },
  //register(userInput: {name, email, password, password2})
  register: async args => {
    try {
      const errors = validateRegisterInput(args.userInput);
      const user = await User.findOne({
        $or: [{ email: args.userInput.email }, { name: args.userInput.name }]
      });
      if (user) {
        errors.email = "Email already exists";
      }
      if (!isEmpty(errors)) {
        throw new Error(JSON.stringify(errors));
      }
      const { name, email, password } = args.userInput;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email: email.toUpperCase(),
        password: hash,
        avatar: "",
        bio: ""
      });
      const result = newUser.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
  //@login(loginInput: {email, password}): AuthData(userId, token)
  login: async args => {
    try {
      const errors = validateLoginInput(args.loginInput);
      const user = await User.findOne({
        email: args.loginInput.email.toUpperCase()
      });
      if (!user) {
        errors.email = "Email not found";
      } else {
        const isMatch = await bcrypt.compare(
          args.loginInput.password,
          user.password
        );
        if (!isMatch) {
          errors.password = "Password incorrect";
        }
      }
      if (!isEmpty(errors)) {
        throw new Error(JSON.stringify(errors));
      }
      const payload = { userId: user._id };
      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: 3600
      });
      const result = { token };

      return result;
    } catch (error) {
      throw error;
    }
  },
  //editUser(editInput: EditUserInput): User!
  editUser: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unathorized");
      }
      const user = await User.findById(req.user);
      if (!user) {
        throw new Error("Token incorrect");
      }

      if (args.editInput.handle) {
        const handleOccupied = await User.findOne({
          handle: args.editInput.handle
        });
        if (handleOccupied) {
          throw new Error("Handle occupied");
        } else {
          user.handle = args.editInput.handle;
        }
      }
      if (args.editInput.avatar) {
        user.avatar = args.editInput.avatar;
      }
      if (args.editInput.bio) {
        user.bio = args.editInput.bio;
      }
      const result = await user.save();
      return result;
    } catch (error) {
      throw error;
    }
  },
  follow: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unathorized");
      }
      const user = await User.findById(req.user);
      if (!user) {
        throw new Error("Token incorrect");
      }
      const userToFollow = await User.findById(args.userId);
      if (!userToFollow) {
        throw new Error("User not found");
      }
      if (user._id.toString() === userToFollow._id.toString()) {
        throw new Error("Cannot follow yourself");
      }
      if (
        userToFollow.followers.filter(
          follower => follower._id.toString() === user._id.toString()
        ).length > 0
      ) {
        throw new Error("Already following");
      }
      userToFollow.followers.push(user._id);
      user.follows.push(userToFollow._id);
      await user.save();
      const result = await userToFollow.save();
      return result;
    } catch (error) {
      throw error;
    }
  },
  unfollow: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unathorized");
      }
      const user = await User.findById(req.user);
      if (!user) {
        throw new Error("Token incorrect");
      }
      const userToUnfollow = await User.findById(args.userId);
      if (!userToUnfollow) {
        throw new Error("User not found");
      }
      if (user._id.toString() === userToUnfollow._id.toString()) {
        throw new Error("Cannot unfollow yourself");
      }
      if (
        userToUnfollow.followers.filter(
          follower => follower._id.toString() === user._id.toString()
        ).length === 0
      ) {
        throw new Error("Need to follow first");
      }
      userToUnfollow.followers = userToUnfollow.followers.filter(
        follower => follower._id.toString() !== user._id.toString()
      );
      user.follows = user.follows.filter(
        follow => follow._id.toString() !== userToUnfollow._id.toString()
      );
      await user.save();
      const result = await userToUnfollow.save();
      return result;
    } catch (error) {
      throw error;
    }
  }
};
