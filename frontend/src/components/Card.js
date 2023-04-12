import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardLike, onCardDelete, card }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((user) => user === currentUser._id);
  const isOwn = card.owner === currentUser._id;
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked && "card__like-btn_active"
  }`;
  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  return (
    <div className="card">
      {isOwn && (
        <button
          type="button"
          className="card__delete-btn"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
