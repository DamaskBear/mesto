  import {showFullscreenHandler} from "./index.js"; 
  // 
  export class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }


// take markup frm HTML-file and clone element 
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

      return cardElement;
    }

    // delete-a-card function
    _deleteCardHandler = () => {
      this._element.remove();
  }

    //like-function
    _likeCardHandler(evt) {
      evt.target.classList.toggle("elements__like-button_active");
    };

    // set listeners for delete, like, pic clicks
    _setEventListeners() {
      this._element.querySelector(".elements__pic-bin").addEventListener("click", this._deleteCardHandler);
      this._element.querySelector(".elements__like-button").addEventListener("click", this._likeCardHandler);
      this._element.querySelector(".elements__photo").addEventListener("click", () => { showFullscreenHandler(this._name, this._link) });
    }

    // create a card (collect all sets)
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      const cardElementImage = this._element.querySelector('.elements__photo');
      const cardElementName = this._element.querySelector('.elements__name');

      cardElementName.textContent = this._name;
      cardElementImage.src = this._link;
      cardElementImage.alt = `Фото ${this._name}`;

      return this._element;
    }
  }