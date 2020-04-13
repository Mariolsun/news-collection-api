const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { PORT, DATABASE_URL, DATABASE_SETTINGS } = require('./config');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const corsHeaders = require('./middlewares/corsHeaders');
const { requestLogger, errorLogger, logError } = require('./middlewares/logger');
const errorController = require('./controllers/errorController');

mongoose.connect(DATABASE_URL, DATABASE_SETTINGS)
  .then(() => {
    const app = express();
    app.set('trust proxy', 1); // указана в доках к express-rate-limit, ip клиента => req.ip
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

    app.use(errorController);


    app.listen(PORT);
  })
  .catch((err) => {
    logError(`could not connect to MongoDB. Err: ${err}`);
  });
