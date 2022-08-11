const express = require('express');
require('dotenv').config();

const { default: mongoose } = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const NotFoundError = require('./errors/not-found-err');
const { login, postUser } = require('./controllers/users');
const { validatePostUser, validateLogin } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// CORS
app.use(cors({
  origin: [
    'https://integrator.nomoredomains.sbs',
    'http://integrator.nomoredomains.sbs',
    'https://api.integrator.nomoredomains.sbs',
    'http://api.integrator.nomoredomains.sbs',
    'https://www.api.integrator.nomoredomains.sbs',
    'http://www.api.integrator.nomoredomains.sbs',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
  ],
  credentials: true,
}));

// Подключаем логгер запросов
app.use(requestLogger);

// Роуты с валидацией данных
app.post('/signin', validateLogin, login);
app.post('/signup', validatePostUser, postUser);

// Миддлвэр авторизации
app.use(auth);

// Роуты с авторизацией
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка сервера' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log('all is right');
});
