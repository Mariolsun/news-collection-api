const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/too-many-requests-err');
const { MESSAGES } = require('../config');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    next(new TooManyRequestsError(MESSAGES.RATE_LIMIT_EXCEEDED));
  },
});

module.exports = limiter;
