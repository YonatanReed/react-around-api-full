const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized-err');

const { NODE_ENV = 'dev' } = process.env;
const JWT_SECRET = NODE_ENV === 'dev' ? 'SOME-SECRET' : process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Authorization required'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
