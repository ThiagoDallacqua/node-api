class UserDAO {
  constructor(user, connect) {
    this._User = user;
    this._connect = connect;
  }

  register(args, callback) {
    const { email, name, surname, password, username } = args
    this._connect();

    this._User.register(new this._User({ email, name, surname, username }), password, callback)
  }
}

module.exports = () => {
  return UserDAO
}
