import '../index.html';
import './index.css';


import Card  from '../components/Card.js'
import FormValidator  from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';

import { 
    validationConfig,
    editButton,
    popupEdit,
    popupAddCard,
    addButton,
    updateAvatar,
    avatarButton,
    inputEdit,
    inputAbout
 } from '../utilits/constants.js';

 //log api
 const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-49',
    headers: {
        authorization: '59f6a1ae-0384-499e-aebb-f4cb2d0443c0',
        'Content-Type': 'application/json'
    }
 })

 let userId = null;

// creation of cards frm constants
const cardPhotos = new Section(
    {
        items: [],
        renderer: (items) => {
            const newCard = createCard(items);
            cardPhotos.addItem(newCard);
        },
    },
    '.elements__card'
);

// userINFO
const userData = new UserInfo({
    name: '.profile__name',
    about: '.profile__about',
    userAvatar: '.profile__avatar'
});

// set validation on input-forms
const formEditProfileValidator = new FormValidator(validationConfig, popupEdit);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, popupAddCard);
formAddCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationConfig, updateAvatar);
formAvatarValidator.enableValidation();

// popup fullscreen photo
const popupFullscreenPhoto = new PopupWithImage ('.popup_type_fullscreen-photo');
popupFullscreenPhoto.setEventListeners();

//popup with user profile
const popupEditForm = new PopupWithForm('.popup_type_edit-form', {
    submitFormHandler: (data) => {
        popupEditForm.renderLoading(true);
        api.updateUserInfo(data)
            .then((res) => {
                userData.setUserInfo(res);
                popupEditForm.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditForm.renderLoading(false);
            })
    }
    });

// fill inputs of edit
function editProfile() {
    const userInput = userData.getUserInfo();
    inputEdit.value = userInput.userName;
    inputAbout.value = userInput.userInfo;
}

popupEditForm.setEventListeners();
editButton.addEventListener('click', () => {
    editProfile();
    popupEditForm.openPopup();
    formEditProfileValidator.removeInputErrors();
});

//popup with user add-form card
const popupAddForm = new PopupWithForm ('.popup_type_add-form',  {
    submitFormHandler: (data) => {
        popupAddForm.renderLoading(true);
        api.addCard(data)
            .then((data) => {
                const card = createCard(data);
                cardPhotos.addItem(card);
                popupAddForm.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAddForm.renderLoading(false);
            })
    }
    
});

popupAddForm.setEventListeners();
addButton.addEventListener('click', () => {
    formAddCardValidator.removeInputErrors();
    popupAddForm.openPopup();
});


//popup with avatar changing form
const popupSetAvatar = new PopupWithForm ('.popup_type_avatar-form', {
    submitFormHandler: (data) => {
        popupSetAvatar.renderLoading(true);
        api.changeUserAvatar(data)
            .then((res) => {
                userData.setUserAvatar(res);
                popupSetAvatar.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupSetAvatar.renderLoading(false);
            })
    }
});

popupSetAvatar.setEventListeners();
avatarButton.addEventListener('click', () => {
    popupSetAvatar.openPopup();
    formAvatarValidator.removeInputErrors();
});


//deletion approvement of card
const popupDeleteCard = new PopupWithConfirm('.popup_type_delete-card', {
    handleSubmit: (data) => {
        api.deleteCard(data)
            .then(() => {
                popupDeleteCard.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
    }
});

popupDeleteCard.setEventListeners();

// promise
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, items]) => {
    userId = userInfo._id;
    
    userData.setUserInfo(userInfo);
    
    userData.setUserAvatar(userInfo);

    cardPhotos.renderItems(items.reverse());
})
.catch((err) => {
    console.log(err);
});

// to add cards
const createCard = (data) => {
    const card = new Card({
        data, userId,
    handleCardClick: () => {
        popupFullscreenPhoto.openPopup(data.name, data.link);
    },

    handleDeleteClick: () => {
        popupDeleteCard.openPopup();
        popupDeleteCard.handleSubmitConfirm(() => {
            api.deleteCard(card._id)
                .then(() => {
                    card.deleteCardHandler();
                    popupDeleteCard.closePopup();
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    },

    handleLikeCard: () => {
        if (card.isLiked()) {
            api.deleteLike(card._id)
                .then((data) => {
                    card.deleteLike();
                    card.setLike(data.likes);
                })
                .catch((err) => {
                    console.log(err);
                })

        } else {
            api.addLike(card._id)
                .then((data) => {
                    card.addLike();
                    card.setLike(data.likes);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    },
    '.card-template');
return card.generateCard();
}