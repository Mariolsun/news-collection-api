const allowedCors = [
// 'https://mesto.website',
// 'http://mesto.website',
  '*',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  // if (allowedCors.includes(origin)) {
  res.header('Access-Control-Allow-Origin', origin);
  // }
  console.log(`addin cors headers`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
};

