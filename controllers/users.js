const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден');
      res.send({ data: { user } });
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
      res.status(201).send({ data: { user: { id: user._id, name: user.name, email: user.email } } }); // чекнуть, что тут нужно из данных возвр.
    })
    .catch(next);
};
