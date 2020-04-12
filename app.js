const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { PORT, DATABASE_URL } = require('./config');
const limiter = require('./middlewares/limiter');
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
    const app = express();
    app.set('trust proxy', 1);
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
    console.log(`could not connect to mongodb. Error: ${err}`);
  });
