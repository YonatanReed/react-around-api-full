const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

const {
  validateCreateCard,
  validateCardId,
} = require('../middleware/validator');

router.get('/', getCards);

router.post('/', validateCreateCard, createCard);

router.delete('/:cardId', validateCardId, deleteCardById);

router.put('/:cardId/likes', validateCardId, likeCard);

router.delete('/:cardId/likes', validateCardId, unlikeCard);

module.exports = router;
