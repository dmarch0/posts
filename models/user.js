const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  handle: {
    type: String
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ]
});

module.exports = mongoose.model("Users", UserSchema);
