import React from "react";

function PopupWithForm({name, title, isOpen, onClose, children, buttonText, onSubmit }) {
  return (
    <div
      className={`popup popup_type_${name} ${
        isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__button-close"
        ></button>
        <form
          className="popup__form form"
          name={`${name}_form`}
          onSubmit={onSubmit}
        >
          <h2 className="form__title">{`${title}`}</h2>
          <fieldset className="form__fieldset">
            {children}
          </fieldset>
          <button className="form__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
        <div
          onClick={onClose}
          className="popup__overlay popup__overlay_profile"
        ></div>
      </div>
    </div>
  );
}

export default PopupWithForm;
