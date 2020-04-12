const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/too-many-requests-err');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    next(new TooManyRequestsError('Превышен лимит запросов. Попробуйте позже.'));
  },
});

module.exports = limiter;
