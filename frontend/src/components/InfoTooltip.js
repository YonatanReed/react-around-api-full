import React from "react";
import successIcon from "../images/success-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        {status === "success" ? (
          <div>
            <img className="popup__icon" src={successIcon} alt="success" />
            <p className="popup__status-message">
              Success! you have now been registered.
            </p>
          </div>
        ) : (
          <div>
            <img className="popup__icon" src={errorIcon} alt="error" />
            <p className="popup__status-message">
              Oops, something went wrong! Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
