const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];



const saveButton = document.querySelector('.popup__save-button');

// edits
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup__type_edit');
const popupEdit = document.querySelector('.popup_type_edit-form');
const editForm = popupEdit.querySelector('.popup__form_type_edit');
const profileName = document.querySelector('.profile__name');
const userName = popupEdit.querySelector('.popup__input_name');
const userJob = popupEdit.querySelector('.popup__input_job');
const profileAbout = document.querySelector('.profile__about');
const closeEditPopup = popupEdit.querySelector('.popup__close-button')


//add cards
const cardsList = document.querySelector('.elements__card'); 
const popupAddCard = document.querySelector('.popup_type_add-form');
const addButton = document.querySelector('.profile__add-button');
const addCardForm = popupAddCard.querySelector('.popup__form_type_add-card');
const inputPlaceName = popupAddCard.querySelector('.popup__input_place-name');
const inputPlaceLink = popupAddCard.querySelector('.popup__input_place-link');
const closeAddPopup = popupAddCard.querySelector('.popup__close-button');

//fullscreen
const popupFullscreen = document.querySelector('.popup_type_fullscreen-photo');
const closeFullscreenPopup = popupFullscreen.querySelector('.popup__close-button');
const fullscreenPhoto = popupFullscreen.querySelector('.popup__fullscreen-photo');
const fullscreenCaption = popupFullscreen.querySelector('.popup__fullscreen-caption');



function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleFillEditPopup() {
    userName.value = profileName.textContent;
    userJob.value = profileAbout.textContent;
    openPopup(popupEdit);
}

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileAbout.textContent = userJob.value;

    closePopup(popupEdit);
}

function handleLikeCard(evt) {  //
    evt.target.classList.toggle('elements__like-button_active');
}

function createCard(cardData) {

    const cardTemplate = document.querySelector(".card-template").content;
    const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardPhoto = cardItem.querySelector('.elements__photo');
    const cardPhotoName = cardItem.querySelector('.elements__name');
    const btnCardLike = cardItem.querySelector('.elements__like-button');
    const btnCardDelete = cardItem.querySelector('.elements__pic-bin');

    cardPhoto.src = cardData.link;
    cardPhotoName.textContent = cardData.name;

    cardPhoto.addEventListener('click', () => {
        handleShowFullScreen(cardData);  // 
    });

    btnCardLike.addEventListener('click', handleLikeCard);

    btnCardDelete.addEventListener('click', handleDeleteCard);

    return cardItem;
}

function handleCreateUserCardSubmit(evt) {    // 
    evt.preventDefault();

    const newCard = {};
    newCard.name = inputPlaceName.value;
    newCard.link = inputPlaceLink.value;

    renderCard(newCard, cardsList);
    addCardForm.reset();

    closePopup(popupAddCard);
}

function renderCard(cardData, element) { //
    const newCard = createCard(cardData);
    element.prepend(newCard);
}
// fullscreen function
function handleShowFullScreen(cardData) {   // 
    fullscreenPhoto.src = cardData.link;
    fullscreenCaption.textContent = cardData.name;

    openPopup(popupFullscreen);
}



function handleDeleteCard(evt) { //
    evt.target.closest('.elements__item').remove();
}
//
initialCards.forEach(item => renderCard(item, cardsList));
//
editButton.addEventListener('click', handleFillEditPopup);

addButton.addEventListener('click', () => openPopup(popupAddCard));

// close modal windows
closeEditPopup.addEventListener('click', () => {
    closePopup(popupEdit);
});

closeAddPopup.addEventListener('click', () => {
    closePopup(popupAddCard);
});

closeFullscreenPopup.addEventListener('click', () => {
    closePopup(popupFullscreen);
});

//

editForm.addEventListener('submit', handleEditProfileSubmit);

addCardForm.addEventListener('submit', handleCreateUserCardSubmit);