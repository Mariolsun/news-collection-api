const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config'); // исправить на process.env

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          name: user.name, // проверить по макету, что имя нужно в токене (мб еще и емейл нужен?)
        },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ data: `Bearer ${token}` });
    })
    .catch(next);
};
