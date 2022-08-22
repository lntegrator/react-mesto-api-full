const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    console.log(NODE_ENV, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
