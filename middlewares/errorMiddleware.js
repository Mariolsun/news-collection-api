
const errorTexts = require('../constants/errors');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message = errorTexts.INTERNAL_ERROR } = err;
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(statusCode)
    .send({
      message,
    });
  return true;
};
