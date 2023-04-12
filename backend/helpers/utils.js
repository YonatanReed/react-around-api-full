const BadRequestError = require('../errors/BadRequest-err');

function errorMassage(err, res, next) {
  if (err.name === 'CastError') {
    next(new BadRequestError(err.message));
  } else if (err.name === 'ValidationError') {
    next(new BadRequestError(err.message));
  } else {
    next(err);
  }
}

module.exports = { errorMassage };
