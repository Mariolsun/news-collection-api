require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

// const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const quotes = require('./routes/quotes');
const personas = require('./routes/personas');
const { createQuote } = require('./controllers/CreateQuote');
const { createPersona } = require('./controllers/CreatePersona');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/quotesdb', {
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

// app.use(cookieParser());

app.use(helmet());


app.use('/', quotes);
app.use('/personas', personas);
app.post('/', createQuote);
app.post('/personas', createPersona);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});
