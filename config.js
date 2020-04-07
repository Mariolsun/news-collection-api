//Копипаста с mesto!!!
require('dotenv').config();

module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/mestodb';
module.exports.JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
module.exports.BASE_PATH = process.env.BASE_PATH || 'localhost';
