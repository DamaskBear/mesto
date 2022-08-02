import '../index.html';
import './index.css';


import Card  from '../components/Card.js'
import FormValidator  from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { 
    initialCards,
    validationConfig,
    editButton,
    popupEdit,
    popupAddCard,
    addButton
 } from '../utilits/constants.js';

 //log api
 const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-46',
    headers: {
        authorization: '9543ec0e-d98d-48a1-9899-998ec00e05e5',
        'Content-type': 'application/json'
    }
 })

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, cards]) => {
    userId = userInfo._id;
    userData.setUserInfo(userInfo);
    cardPhotos.addItem(cards);
})
.catch((err) => console.log(err))
.finally(() => {})

let userId;

//fullscreen function 
function handleCardClick(name, link) { 
    popupFullscreenPhoto.openPopup(name, link)
}

// handler for edit profile (open popup, reset, submit)
function handleEditFormPopup() {
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
editButton.addEventListener('click', handleEditFormPopup);

//popup with user add-form card
const popupAddForm = new PopupWithForm ('.popup_type_add-form', (data) => {
    const userNewCard = createCard(data);
    cardPhotos.addItem(userNewCard);
    popupAddForm.closePopup();
});

popupAddForm.setEventListeners();
addButton.addEventListener('click', createUserCardHandler);