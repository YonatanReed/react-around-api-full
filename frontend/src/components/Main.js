import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { avatar, name, about } = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image">
          <img src={avatar} className="profile__avatar" alt="profile" />
          <span
            onClick={handleEditAvatarClick}
            className="profile__avatar-container"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            onClick={handleEditProfileClick}
            className="profile__edit-btn"
            type="button"
          />
          <p className="profile__about">{about}</p>
        </div>
        <button
          onClick={handleAddPlaceClick}
          className="profile__add-btn"
          type="button"
        />
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
