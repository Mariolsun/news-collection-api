require('dotenv').config();

module.exports.PORT = process.env.PORT || 3000;
module.exports.JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
module.exports.BASE_PATH = process.env.BASE_PATH || 'localhost';
module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/newscollectiondb';
module.exports.DATABASE_SETTINGS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
