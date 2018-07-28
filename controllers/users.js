const passport = require('passport')
const jwt = require('jsonwebtoken');

module.exports = app => {
  app.post('/register', (req, res) => { //sign up route
    req.assert('name', 'A valid name must be informed!')
      .notEmpty();

    req.assert('email', 'A valid email must be informed!')
      .notEmpty();

    req.assert('password', 'A valid password must be informed!')
      .notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      console.log(`validation in the resgistration errors ${JSON.stringify(erros)}`);

      res.status(400).send(erros);
      return
    }

    const model = app.models.user;
    const connect = app.infra.connectionFactory;
    const user = new app.infra.UserDAO(model, connect);

    const userData = {
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password
    };

    user.register(userData, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      passport.authenticate('local')(req, res, () => {
        res.json(req.user);
      })
    });
  })

  app.post('/login', (req, res) => { //login route
    req.assert('email', 'A valid email must be informed!')
      .notEmpty();

    req.assert('password', 'A valid password must be informed!')
      .notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      console.log(`validation errors in the login${JSON.stringify(erros)}`);

      res.status(400).send(erros);
      return
    }

    const connect = app.infra.connectionFactory;

    connect();

    passport.authenticate('local')(req, res, () => {
      const payload = {
        user: req.user,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in 1 hour
      }
      const token = jwt.sign(payload, process.env.TOKEN_SECRET);

      res.json({
        success: true,
        token: token
      })
    })
  });
}
