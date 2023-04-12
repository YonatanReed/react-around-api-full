import React from 'react';

function PopupWithForm({
  title,
  buttonText,
  children,
  mod,
  name,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <button className='popup__close-btn' type='button' onClick={onClose} />
        <form
          name={`${name}-form`}
          className={`form form_type_${name}`}
          onSubmit={onSubmit}
        >
          <fieldset className='form__field-set'>
            {children}
            <button
              type='submit'
              className={`form__save-btn form__submit ${mod}`}
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
