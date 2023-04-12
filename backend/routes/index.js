const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middleware/auth');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFound-err');
const {
  validateLogin,
  validateCreateUser,
} = require('../middleware/validator');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
