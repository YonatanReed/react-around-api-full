import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const handleNameChange = (e) => setName(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  };

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="New place"
      name="add-place"
      buttonText="Create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input form__input_type_title"
        id="place-title"
        name="place-title"
        placeholder=" Title"
        required
        minLength="1"
        maxLength="300"
        onChange={handleNameChange}
        value={name}
      />
      <span className="form__input-error title-error" />
      <input
        type="url"
        className="form__input form__input_type_image-link"
        id="image"
        name="image"
        placeholder=" Image link"
        required
        onChange={handleLinkChange}
        value={link}
      />
      <span className="form__input-error image-link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
