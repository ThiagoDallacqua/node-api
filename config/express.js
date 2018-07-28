const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');

module.exports = function() {
  const app = express();

  app.use(bodyParser.json());
  app.use(expressValidator());

  app.use(passport.initialize());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  consign()
  .include('controllers')
  .then('infra')
  .then('models')
  .then('utils')
  .then('middlewares')
  .into(app);

  return app
}
