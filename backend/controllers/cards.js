const ForbiddenError = require('../errors/Forbidden-err');
const NotFoundError = require('../errors/NotFound-err');
const BadRequestError = require('../errors/BadRequest-err');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({
    name,
    link,
    owner: ownerId,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.massage));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Card not found');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('You can only delete your own cards'));
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((removeCard) => res.status(200).send(removeCard)
          );
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('Card not found');
    })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        next(new NotFoundError('No card found'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.massage));
      } else {
        next(err);
      }
    });
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('Card not found');
    })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        next(new NotFoundError('Card not found'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.massage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
};
