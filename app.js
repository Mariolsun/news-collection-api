//Копипаста с mesto!!!
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { PORT, BASE_PATH, DATABASE_URL } = require('./config');
const users = require('./routes/users');
const cards = require('./routes/cards');
const signin = require('./routes/signin');
const signup = require('./routes/signup');
const pageLoad = require('./routes/pageLoad');

const auth = require('./middlewares/auth');
const corsHeaders = require('./middlewares/corsHeaders');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('successful connection!');
  })
  .catch((err) => {
    console.log(`error connecting to mongodb: ${err.message}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
app.use(corsHeaders);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/cards', cards);
app.use('/pageload', pageLoad);
app.use(auth);
app.use('/users', users);
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
