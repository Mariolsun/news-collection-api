const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/too-many-requests-err');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  handler: (req, res, next) => {
    next(new TooManyRequestsError(`Too many requests - your IP ${req.connection.remoteAddress} is being rate limited`));
  },
});

module.exports = limiter;
