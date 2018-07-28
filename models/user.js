const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose, {usernameQueryFields: ['email']});

UserSchema.statics.findOrCreate = ({ email, name, surname, username }, callback) => {
  return this.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user) {
      user = new User({
        username,
        name,
        surname,
        email
      });
      user.save((err) => {
        if (err) console.log(err);
        return callback(err, user);
      });
    } else {
      return callback(err, user);
    }
  });
}

const User = mongoose.model('User', UserSchema)

module.exports = () => {
  return User
}
