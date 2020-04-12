const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const { email, name } = user;
      if (!user) throw new NotFoundError('Пользователь не найден');
      res.send({ data: { email, name } });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  User.exists({ email })
    .then((exists) => {
      if (exists) throw new ConflictError('Пользователь с таким email уже существует');
    })
    .then(() => {
      const { password } = req.body;
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      const { name } = req.body;
      return User.create({
        email, password: hash, name,
      });
    })
    .then((user) => {
      res.status(201).send({ data: { email: user.email, name: user.name } }); // чекнуть, что нужно
    })
    .catch(next);
};
