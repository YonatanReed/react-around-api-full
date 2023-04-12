import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleInputChange = (e) => {
    e.target.name === "name"
      ? setName(e.target.value)
      : setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      title="Edit profile"
      name="edit"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input form__input_type_name"
        id="name"
        name="name"
        placeholder=" Name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleInputChange}
      />

      <span className="form__input-error name-error" />

      <input
        type="text"
        className="form__input form__input_type_about"
        id="about"
        name="about"
        placeholder=" About me"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleInputChange}
      />

      <span className="form__input-error about-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
