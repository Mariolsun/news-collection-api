require('dotenv').config();

module.exports.PORT = process.env.PORT || 3000;
module.exports.JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
module.exports.ALLOWED_CORS = [
  'http://newscollection.gq',
  'https://newscollection.gq',
];
module.exports.BASE_PATH = process.env.BASE_PATH || 'localhost';
module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/newscollectiondb';
module.exports.DATABASE_SETTINGS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
module.exports.MESSAGES = {
  ARTICLE_NOT_FOUND: 'Такой карточки нет в базе',
  ARTICLE_DELETED: 'Карточка удалена',
  ARTICLE_NOT_DELETED_NOT_OWNER: 'Статью может удалить только ее создатель!',
  USER_NOT_FOUND: 'Пользователь не найден',
  USER_ALREADY_EXISTS: 'Пользователь с таким email уже существует',
  AUTH_NEEDED: 'Необходима авторизация',
  AUTH_WRONG_CREDENTIALS: 'Неправильные почта или пароль',
  VALID_NOT_LINK: '- неправильная ссылка!',
  VALID_NOT_EMAIL: '- неправильный email!',
  RATE_LIMIT_EXCEEDED: 'Превышен лимит запросов, попробуйте позже.',
  NOT_FOUND_DEFAULT: 'Запрашиваемый ресурс не найден',
};

module.exports.REQUEST_LOG_FILE = 'request.log';
module.exports.ERROR_LOG_FILE = 'error.log';
