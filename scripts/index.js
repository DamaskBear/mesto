import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidation.js";

const popups = document.querySelectorAll('.popup');
// edits
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit-form');
//const editForm = popupEdit.querySelector('.popup__form_type_edit');
const profileName = document.querySelector('.profile__name');
const userName = popupEdit.querySelector('.popup__input_name');
const userJob = popupEdit.querySelector('.popup__input_job');
const profileAbout = document.querySelector('.profile__about');
const popupCloseEdit = popupEdit.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form_type-edit');

//add cards
const cardsList = document.querySelector('.elements__card'); 
const popupAddCard = document.querySelector('.popup_type_add-form');
const addButton = document.querySelector('.profile__add-button');
const cardFormAdd = popupAddCard.querySelector('.popup__form_type_add-card');
const inputPlaceName = popupAddCard.querySelector('.popup__input_place-name');
const inputPlaceLink = popupAddCard.querySelector('.popup__input_place-link');
//const popupCloseAdd = popupAddCard.querySelector('.popup__close-button');

//fullscreen
const popupFullscreen = document.querySelector('.popup_type_fullscreen-photo');
//const popupCloseFullscreen = popupFullscreen.querySelector('.popup__close-button');
const fullscreenPhoto = popupFullscreen.querySelector('.popup__fullscreen-photo');
const fullscreenCaption = popupFullscreen.querySelector('.popup__fullscreen-caption');

//profile
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about');

//validation selectors
const validationConfig = {
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
    cardFormAdd.reset();
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

    formEditProfileValidator.removeInputErrors();
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
function handleCardClick(name, link) {
    fullscreenPhoto.src = link;
    fullscreenCaption.textContent = name;
    fullscreenPhoto.alt = `Фото: ${name}`;

    openPopup(popupFullscreen);
}

// to add cards frm JS
function createCard(cardData) {
   return (new Card(cardData, '#card-template', handleCardClick)).generateCard();
}

//render of getting example Card
function renderCard(cardItem, parent) {
    parent.prepend(cardItem);
}

// creation of new card with user data
function createUserCardHandler(evt) {
    
    evt.preventDefault();

    const newCard = {};
    newCard.name = inputPlaceName.value;
    newCard.link = inputPlaceLink.value;

    const card = createCard(newCard);
    renderCard(card, cardsList);
    closePopup(popupAddCard);
};

// slu6ateli
formElement.addEventListener('submit', submitFormHandler);

editButton.addEventListener('click', editFormPopupHandler);

addButton.addEventListener('click', () => {
openPopup(popupAddCard);
formAddCardValidator.removeInputErrors();
});

cardFormAdd.addEventListener('submit', createUserCardHandler);

// close all popups with one button
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});


// create cards frm js-file
initialCards.forEach(item => {
    const card = createCard(item);
    renderCard(card, cardsList);
  });

// set validation on input-forms
const formEditProfileValidator = new FormValidator(validationConfig, popupEdit);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, popupAddCard);
formAddCardValidator.enableValidation();