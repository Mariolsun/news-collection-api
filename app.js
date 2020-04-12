const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate'); // это нужно здесь?
const { PORT, DATABASE_URL } = require('./config'); // здесь мб process.env?
const routes = require('./routes/index');
const corsHeaders = require('./middlewares/corsHeaders'); // нужно это?
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorController = require('./controllers/errorController');

mongoose.connect(DATABASE_URL, { // разобраться с настройками mongoose
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('all ok');
    const app = express();
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
    console.log(`error!`);
    errorLogger.error(err);
  });
