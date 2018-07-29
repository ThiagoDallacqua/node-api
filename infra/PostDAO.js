class PostDAO {
  constructor(model, connect) {
    this._Post = model;
    this._connect = connect;
  }

  create(args, callback) {
    this._connect();

    this._Post.create(args, callback)
  }

  list(callback) {
    this._connect();

    this._Post.find({}, callback);
  }

  delete(args, callback) {
    this._connect();

    this._Post.deleteOne(
      { "user.id": { $eq: args.userId }, _id: args.postId },
      callback)
      .then(result => console.log("post deleted"))
      .catch(err => console.log(err));
  }
}

module.exports = function () {
  return PostDAO
}
