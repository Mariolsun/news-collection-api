require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || 3000;
const JWT_SECRET = isProduction ? process.env.JWT_SECRET : 'dev-secret';
const ALLOWED_CORS = [
  'http://newscollection.gq',
  'https://newscollection.gq',
];
const BASE_PATH = isProduction ? process.env.BASE_PATH : 'localhost';
const DATABASE_PATH = isProduction ? process.env.DATABASE_PATH : 'mongodb://localhost:27017/newscollectiondb';
const DATABASE_SETTINGS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const REQUEST_LOG_FILE = 'request.log';
const ERROR_LOG_FILE = 'error.log';

module.exports = {
  PORT,
  JWT_SECRET,
  ALLOWED_CORS,
  BASE_PATH,
  DATABASE_PATH,
  DATABASE_SETTINGS,
  REQUEST_LOG_FILE,
  ERROR_LOG_FILE,
};
