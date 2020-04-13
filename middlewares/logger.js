
const winston = require('winston');
const expressWinston = require('express-winston');
const { REQUEST_LOG_FILE, ERROR_LOG_FILE } = require('../config');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: REQUEST_LOG_FILE }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: ERROR_LOG_FILE }),
  ],
  format: winston.format.json(),
});

const customErrorLogger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({ level: 'error' }),
    new winston.transports.File({
      filename: ERROR_LOG_FILE,
      level: 'info',
    }),
  ],
});

function logError(message) {
  customErrorLogger.info(message);
}

module.exports = {
  requestLogger,
  errorLogger,
  logError,
};
