
module.exports = (err, req, res, next) => { // чтоже бл* делать с этим next?!
  const { statusCode = 500, message } = err;
  console.log('error controller running');
  res
    .status(statusCode)
    .send({
      message,
    });
};
