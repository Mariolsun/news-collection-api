const { ALLOWED_CORS } = require('../config');

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  // if (ALLOWED_CORS.includes(origin)) {
  if (true) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
};
