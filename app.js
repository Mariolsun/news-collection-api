const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate'); // это нужно здесь?
const { PORT, BASE_PATH, DATABASE_URL } = require('./config'); // здесь мб process.env?
const router = require('./routes/index');
const corsHeaders = require('./middlewares/corsHeaders'); // нужно это?
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect(DATABASE_URL, { // разобраться с настройками mongoose
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('successful connection!'); // это нужно? мб как-то в логгер?
  })
  .catch((err) => {
    console.log(`error connecting to mongodb: ${err.message}`); // а это?
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(corsHeaders); // Разобраться. мб есть специальный пакет? мб спросить в слаке
app.use(requestLogger);

app.get('/crash-test', () => { // убрать по готовности!!!
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});
app.use(router);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(`error controller. status: ${err.message}`);
  res
    .status(statusCode)
    .send({
      message,
    });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});
