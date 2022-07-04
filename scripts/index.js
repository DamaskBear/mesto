import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidation.js";
// edits
const editButton = document.querySelector('.profile__edit-button');
// const editPopup = document.querySelector('.popup__type_edit');
const popupEdit = document.querySelector('.popup_type_edit-form');
const editForm = popupEdit.querySelector('.popup__form_type_edit');
const profileName = document.querySelector('.profile__name');
const userName = popupEdit.querySelector('.popup__input_name');
const userJob = popupEdit.querySelector('.popup__input_job');
const profileAbout = document.querySelector('.profile__about');
const popupCloseEdit = popupEdit.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form_type-edit');

//add cards
// const cardTemplate = document.querySelector(".card-template");
const cardsList = document.querySelector('.elements__card'); 
const popupAddCard = document.querySelector('.popup_type_add-form');
const addButton = document.querySelector('.profile__add-button');
const cardFormAdd = popupAddCard.querySelector('.popup__form_type_add-card');
const inputPlaceName = popupAddCard.querySelector('.popup__input_place-name');
const inputPlaceLink = popupAddCard.querySelector('.popup__input_place-link');
const popupCloseAdd = popupAddCard.querySelector('.popup__close-button');

//fullscreen
const popupFullscreen = document.querySelector('.popup_type_fullscreen-photo');
const popupCloseFullscreen = popupFullscreen.querySelector('.popup__close-button');
const fullscreenPhoto = popupFullscreen.querySelector('.popup__fullscreen-photo');
const fullscreenCaption = popupFullscreen.querySelector('.popup__fullscreen-caption');

//profile
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about');

//validation selectors
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup_error_visible'
  };

//close by click overlay
function closePopupOverlay(evt) {
    const openedPopup = evt.target;
    if (openedPopup.classList.contains('popup_opened')) {
        closePopup(openedPopup);
    }  
}

// close by ESC
function closePopupEsc (evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// open popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('mousedown',closePopupOverlay);
    formEditProfileValidator.restartFormValidation();
    formAddCardValidator.restartFormValidation();
}

//close popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('mousedown',closePopupOverlay);
}

//
function editFormPopupHandler() {
    userName.value = profileName.textContent;
    userJob.value = profileAbout.textContent;
    openPopup(popupEdit);
    resetDisabledButton(popupEdit, validateConfig);
}

// old code frm 4th sprint
function submitFormHandler (evt) {
    evt.preventDefault();
    
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    
    name.textContent = nameInputValue;
    job.textContent = jobInputValue;
    closePopup(popupEdit);
} 

//fullscreen function
function showFullscreenHandler(name, link) {
    fullscreenPhoto.src = link;
    fullscreenCaption.textContent = name;
    fullscreenPhoto.alt = `Фото: ${name}`;

    openPopup(popupFullscreen);
}

// function showFullscreenHandler(name, link) {
//     fullscreenCaption.textContent = name;
//     fullscreenPhoto.alt = name;
//     fullscreenPhoto.src = link;
//     openPopup(popupFullscreen);
// }

// to add cards frm JS
function createCard(cardData) {
    const card = new Card(cardData, '#card-template');
    const newCard = card.generateCard();

  return newCard;
   
}
//рендер 
function renderCard(cardItem, parent) {
    parent.prepend(cardItem);
}


// creation of new card
function createUserCardHandler(evt) {
    
    evt.preventDefault();

    const newCard = {};
    newCard.name = inputPlaceName.value;
    newCard.link = inputPlaceLink.value;

    const card = createCard(newCard);
    renderCard(card, cardsList);
    cardFormAdd.reset();
    closePopup(popupAddCard);
    resetDisabledButton(popupAddCard, validateConfig);
}

// slu6ateli
formElement.addEventListener('submit', submitFormHandler);

editButton.addEventListener('click', editFormPopupHandler);

addButton.addEventListener('click', () => openPopup(popupAddCard));

cardFormAdd.addEventListener('submit', createUserCardHandler);

// to close popup windows
popupCloseEdit.addEventListener('click', () => {
    closePopup(popupEdit);
    removeInputErrors(popupEdit, validateConfig);
});

popupCloseAdd.addEventListener('click', () => {
    cardFormAdd.reset();
    closePopup(popupAddCard);
    //removeInputErrors(popupAddCard, validateConfig);
});

popupCloseFullscreen.addEventListener('click', () => {
    closePopup(popupFullscreen);
});

// cards frm js
/*Создание экзмепляров класса Card для исходных карточек*/
initialCards.forEach(item => {
    const card = createCard(item);
    renderCard(card, cardsList);
  });

// validation 
//для каждой формы включаю экземпляр валидатора и включаю валидацию.

const formEditProfileValidator = new FormValidator(selectors, popupEdit);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(selectors, popupAddCard);
formAddCardValidator.enableValidation();

export {showFullscreenHandler};