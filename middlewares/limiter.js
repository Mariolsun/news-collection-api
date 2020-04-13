const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/too-many-requests-err');
const { ERRORS } = require('../constants/errors');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    next(new TooManyRequestsError(ERRORS.RATE_LIMIT_EXCEEDED));
  },
});

module.exports = limiter;
