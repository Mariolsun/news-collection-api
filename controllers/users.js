// const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const errorTexts = require('../constants/errors');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const { email, name } = user;
      if (!user) throw new NotFoundError(errorTexts.USER_NOT_FOUND);
      res.header('Cache-Control', 'no-cache').send({ data: { email, name } });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  User.exists({ email })
    .then((exists) => {
      if (exists) throw new ConflictError(errorTexts.USER_ALREADY_EXISTS);
    })
    .then(() => {
      const { name, password } = req.body;
      return User.create({
        email, password, name, // пароль хэшируется в pre save хуке в models/user.js
      });
    })
    .then((user) => {
      res.status(201).send({ data: { email: user.email, name: user.name } });
    })
    .catch(next);
};
