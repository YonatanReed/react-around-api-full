import React from "react";

import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      title="Change profile picture"
      name="edit-avatar"
      buttonText="Save"
      mod="form__save-btn_avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="form__input form__input_type_avatar"
        id="avatar"
        name="avatar"
        placeholder="profile picture link"
        required
        ref={avatarRef}
      />
      <span className="form__input-error avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
