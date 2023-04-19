const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedError = require('../errors/Unauthorized-err');
const BadRequestError = require('../errors/BadRequest-err');
const NotFoundError = require('../errors/NotFound-err');
const ConflictError = require('../errors/Conflict-err');

const { errorMassage } = require('../helpers/utils');

const { JWT_SECRET = 'default_secret_key' } = process.env;

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Email already exists');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect credentials'));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  getUserInfo(req.user._id, res, next);
};

const getUserInfo = (id, res, next) => {
  User.findById(id)
    .orFail(() => {
      throw new notFoundError('No user with matching ID found');
    })
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userid)
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => errorMassage(err, res, next));
};

const updateUser = (req, res, next) => {
  const {
    user: { _id },
    body,
  } = req;
  User.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
};
