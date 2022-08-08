import Popup from "./Popup";

export default class PopupWithConfirm extends Popup{
    constructor(popupSelector, {handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._setEvent = this._setEvent.bind(this);
    }

    handleSubmitConfirm(submitConfirm) {
        this._handleSubmit = submitConfirm;
    }

    _setEvent(evt) {
        evt.preventDefault();
        this._handleSubmit();
    }

    openPopup() {
        super.openPopup();
        this._popup.addEventListener('submit', this._setEvent);
    }

    closePopup() {
        super.closePopup();
        this._popup.removeEventListener('submit', this._setEvent);
    }
}