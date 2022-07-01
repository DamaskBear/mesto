  import {showFullscreenHandler} from "./index.js";
  // нужно определить, что засунуть в констурктор и его тело. 
  // 
  export class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this.cardSelector = cardSelector;
    }


// take markup frm HTML-file and clone element 
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

      return cardElement;
    }

    // Удаление карточки
    _deleteCardHandler = () => {
      this._element.remove();
  }

    //лайк
    _likeCardHandler(evt) {
      evt.target.classList.toggle("elements__like-button_active");
    };

    _setEventListeners() {
      this._element.querySelector(".elements__pic-bin").addEventListener("click", this._deleteCardHandler);
      this._element.querySelector(".elements__like-button").addEventListener("click", this._likeCardHandler);
      this._element.querySelector(".element__image").addEventListener("click", () => { showFullscreenHandler(this._name, this._link) });
    }

    generateCard() {
      this._element = this._getTemplate();
      
      // Добавим данные
      const cardElementImage = this._element.querySelector('.elements__photo');
      const cardElementName = this._element.querySelector('.elements__name');
      cardElementImage.setAttribute("src", this._link);
      cardElementImage.setAttribute("alt", this._name);
      cardElementName.textContent = this._name;

      this._setEventListeners();

      return this._element;
    }
  }