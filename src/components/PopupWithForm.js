import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupInput = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._userValues = {};
        this._popupInput.forEach((input) => {
            this._userValues[input.name] = input.value;
        });
        return this._userValues;
    }

    setInputsValues(data) {
        this._popupInput.forEach((input) => {
          input.value = data[input.name];
        });
      }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormHandler(this._getInputValues());
        });
    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }
}