  export default class Card {
    constructor(data, cardSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
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
      this._element = null;
  }

    //like-function
    _likeCardHandler(evt) {
      evt.target.classList.toggle("elements__like-button_active");
    };

    // create a card (collect all sets)
    generateCard() {
      this._element = this._getTemplate();

      this._cardElementImage = this._element.querySelector('.elements__photo');
      
      this._setEventListeners();

      this._element.querySelector('.elements__name').textContent = this._name;
      this._cardElementImage.src = this._link;
      this._cardElementImage.alt = `Фото ${this._name}`;

      return this._element;
    }

    // set listeners for delete, like, pic clicks
    _setEventListeners() {
      this._element.querySelector(".elements__pic-bin").addEventListener("click", this._deleteCardHandler);
      this._element.querySelector(".elements__like-button").addEventListener("click", this._likeCardHandler);
      this._cardElementImage.addEventListener("click", () => { this._handleCardClick(this._name, this._link) });
    }
  }