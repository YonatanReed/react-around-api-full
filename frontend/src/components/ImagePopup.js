import React from "react";

function ImagePopup({ isOpen, onClose, selectedCard }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button className="popup__close-btn" type="button" onClick={onClose} />
        <img
          className="popup__image"
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <p className="popup__caption">{selectedCard.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
