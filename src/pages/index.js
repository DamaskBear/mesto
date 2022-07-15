import '../index.html';
import './index.css';


import Card  from '../components/Card.js'
import FormValidator  from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { 
    initialCards,
    validationConfig,
    editButton,
    popupEdit,
    popupAddCard,
    addButton
 } from '../utilits/constants.js';

//fullscreen function 
function handleCardClick(name, link) { 
    popupFullscreenPhoto.openPopup(name, link)
}

// handler for edit profile (open popup, reset, submit)
function editFormPopupHandler() {
    const userInfo = userData.getUserInfo();
    popupEditForm.setInputsValues(userInfo);
    popupEditForm.openPopup();
    formEditProfileValidator.removeInputErrors();
}

const userData = new UserInfo({
    userName: '.profile__name',
    userJob: '.profile__about'
});

// to add cards frm JS
function createCard(cardData) {
   return (new Card(cardData, '#card-template', handleCardClick)).generateCard();
}

// creation of new card with user data
function createUserCardHandler() {
    formAddCardValidator.removeInputErrors();
    popupAddForm.openPopup();
};

// set validation on input-forms
const formEditProfileValidator = new FormValidator(validationConfig, popupEdit);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, popupAddCard);
formAddCardValidator.enableValidation();

// creation of cards frm constants
const cardPhotos = new Section(
    {
        items: initialCards,
        renderer: (data) => {
            const newCard = createCard(data);
            cardPhotos.addItem(newCard);
        },
    },
    '.elements__card'
);

cardPhotos.renderItems();

// popup fullscreen photo
const popupFullscreenPhoto = new PopupWithImage ('.popup_type_fullscreen-photo');
popupFullscreenPhoto.setEventListeners();

//popup with user profile
const popupEditForm = new PopupWithForm('.popup_type_edit-form', (data) => {
    userData.setUserInfo(data);
    popupEditForm.closePopup();
});

popupEditForm.setEventListeners();
editButton.addEventListener('click', editFormPopupHandler);

//popup with user add-form card
const popupAddForm = new PopupWithForm ('.popup_type_add-form', (data) => {
    const userNewCard = createCard(data);
    cardPhotos.addItem(userNewCard);
    popupAddForm.closePopup();
});

popupAddForm.setEventListeners();
addButton.addEventListener('click', createUserCardHandler);