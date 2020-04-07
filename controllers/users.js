const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден');
      res.send({ data: user });
    })
    .catch(next);
};
