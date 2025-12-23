// ------- initialization ------- \\
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ------- creation of schema ------- \\
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// ------- package and export ------- \\
const Post = mongoose.model("Post", postSchema, "posts");
module.exports = Post;
