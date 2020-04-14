const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { SERVER_PORT, DB_PATH, DATABASE_SETTINGS } = require('./config');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const corsHeaders = require('./middlewares/corsHeaders');
const { requestLogger, errorLogger, logError } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/errorMiddleware');

mongoose.connect(DB_PATH, DATABASE_SETTINGS)
  .then(() => {
    const app = express();
    app.set('trust proxy', 1); // указана в доках к express-rate-limit, нужна при использовании reverse proxy (nginx). ip клиента => req.ip

    app.use(limiter);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(cookieParser());
    app.use(corsHeaders);
    app.use(requestLogger);
    app.use('/', routes);

    app.use(errors());
    app.use(errorLogger);

    app.use(errorMiddleware);


    app.listen(SERVER_PORT);
  })
  .catch((err) => {
    logError(`could not connect to MongoDB. Err: ${err}`);
  });
