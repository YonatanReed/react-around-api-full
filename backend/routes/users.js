const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUpdateUser,
  validateUpdateAvatar,
  validateUserId,
} = require('../middleware/validator');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userid', validateUserId, getUserById);

router.patch('/me', validateUpdateUser, updateUser);

router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
