const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    email: String
  },
  post: {
    content: String,
    postDate: Date
  }
});

const Post = mongoose.model('Post', PostSchema)

module.exports = () => {
  return Post
}
