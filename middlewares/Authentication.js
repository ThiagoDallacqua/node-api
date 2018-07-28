const jwt = require('jsonwebtoken');

const Authentication = {
  hasValidToken: (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });

    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  }
}

module.exports = Authentication
