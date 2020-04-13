
const jwt = require('jsonwebtoken');
const NeedAuthError = require('../errors/need-auth-err');
const { JWT_SECRET, MESSAGES } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new NeedAuthError(MESSAGES.AUTH_NEEDED));
  }

  req.user = payload;

  next();
};
