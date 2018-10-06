const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function createDBConnection() {
  if (!process.env.NODE_ENV) {
    mongoose.connect("mongodb://localhost:27017/node-api", {useNewUrlParser: true })
  }

  if (process.env.NODE_ENV == 'production') {
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true })
  }

  return mongoose
}

module.exports = () => {
  return createDBConnection;
}
