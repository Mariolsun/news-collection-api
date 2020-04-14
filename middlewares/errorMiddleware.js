
const errorTexts = require('../constants/errors');

module.exports = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? errorTexts.INTERNAL_ERROR : err.message;
  if (res.headersSent) {
    return next(err);
  }
  return res
    .status(statusCode)
    .send({
      message,
    });
};
