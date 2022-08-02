  export default class Card {
    constructor(data, userId, cardSelector, handleCardClick, handleLikeCard) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._id = data._id;
      this._ownerId = data.owner._id;
      this._userId = userId;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleLikeCard = handleLikeCard;
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
    deleteCardHandler = () => {
      this._element.remove();
      this._element = null;
  }

    // //like-function
    // likeCardHandler(evt) {
    //   evt.target.classList.toggle("elements__like-button_active");
    // };

    // create a card (collect all sets)
    generateCard() {
      this._element = this._getTemplate();

      this._cardElementImage = this._element.querySelector('.elements__photo');
      this._btnLike - this._element.querySelector('.elements__like-button');
      this._likesCount = this._element.querySelector('.elements__like-count');
      
      this._setEventListeners();

      this._element.querySelector('.elements__name').textContent = this._name;
      this._cardElementImage.src = this._link;
      this._cardElementImage.alt = `Фото ${this._name}`;

      this.setLike(this._likes);

      this._checkOwnLike();

      return this._element;
    }

    // set listeners for delete, like, pic clicks
    _setEventListeners() {
      this._element.querySelector(".elements__pic-bin").addEventListener("click", this.deleteCardHandler);
      this._element.querySelector(".elements__like-button").addEventListener("click", this.likeCardHandler);
      this._cardElementImage.addEventListener("click", () => { this._handleCardClick(this._name, this._link) });
      this._btnLike.addEventListener('click', () => { this._handleLikeCard() });
    }

    isLiked() {
      return this._likes.find(user => user._id === this._userId);
  }

  _checkOwnLike() {
      this.isLiked() ? this.addLike() : this.deleteLike();
  }

  setLike(data) {
      this._likes = data;
      this._likesCount.textContent = this._likes.length;
  }

  addLike = () => {
      this._btnLike.classList.add('element__like-button_active');
  }

  deleteLike = () => {
      this._btnLike.classList.remove('element__like-button_active');
  }

  }