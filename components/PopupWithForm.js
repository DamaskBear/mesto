import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupInput = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._values = {};
        this._popupInput.forEach((input) => {
            this._values[input.name] = input.value;
        });
        return this._values;
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