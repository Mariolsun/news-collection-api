const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_STRING } = require('../config');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
        SECRET_STRING,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ data: { jwt: `Bearer ${token}` } });
    })
    .catch(next);
};
