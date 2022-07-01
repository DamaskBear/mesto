export class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }

    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    return cardElement;
    }

    //like
    _likeCardHandler(evt) {
      evt.target.classList.toggle('elements__like-button_active');
    }

//delete button for cards
    _deleteCardHandler() {
      this._element.remove();
    }

    _setEventListeners() {
      const deleteBtn = this._element.querySelector('.elements__pic-bin');
      const likeBtn = this._element.querySelector(".elements__like-button");

      likeBtn.addEventListener('click', (evt) => {
        this._likeCardHandler(evt);
      });
  
      deleteBtn.addEventListener('click', () => {
        this._deleteCardHandler();
      });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardTitle = this._element.querySelector('.elements__name');
        const cardImg = this._element.querySelector('.elements__photo');
    
        cardTitle.textContent = this._name;
        cardImg.src = this._name;
        cardImg.alt = `Пользовательское фото места ${this._name}`;
    
        return this._element;
    }
  }