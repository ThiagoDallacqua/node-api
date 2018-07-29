const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  post: {
    title: String,
    content: String,
    postDate: Date,
    creator: String
  }
});

const Post = mongoose.model('Post', PostSchema)

module.exports = () => {
  return Post
}
