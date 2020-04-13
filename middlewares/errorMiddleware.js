
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
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
