require('dotenv').config();

const {
  NODE_ENV, PORT, JWT_SECRET, DATABASE_PATH,
} = process.env;

const isProduction = NODE_ENV === 'production';

const DEV_SECRET = 'dev-secret';
const DEV_PORT = 3000;
const DEV_DATABASE_PATH = 'mongodb://localhost:27017/newscollectiondb';

const SERVER_PORT = isProduction && PORT ? PORT : DEV_PORT;
const SECRET_STRING = isProduction && JWT_SECRET ? JWT_SECRET : DEV_SECRET;
const DB_PATH = isProduction && DATABASE_PATH ? DATABASE_PATH : DEV_DATABASE_PATH;

const ALLOWED_CORS = [
  'http://newscollection.gq',
  'https://newscollection.gq',
];
const DATABASE_SETTINGS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const REQUEST_LOG_FILE = 'request.log';
const ERROR_LOG_FILE = 'error.log';

module.exports = {
  SERVER_PORT,
  SECRET_STRING,
  ALLOWED_CORS,
  DB_PATH,
  DATABASE_SETTINGS,
  REQUEST_LOG_FILE,
  ERROR_LOG_FILE,
};
