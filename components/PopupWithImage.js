import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imgPopup = this._popup.querySelector('.popup__fullscreen-photo');
        this._captionPopup = this.popup.querySelector('.popup__fullscreen-caption');
    }

    openPopup({name, link}) {
        this._imgPopup.src = link;
        this._captionPopup.textContent = name;
        this._imgPopup.alt = `Фото: ${name}`;

        super.openPopup();
    }
}