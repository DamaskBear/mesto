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
    initialCards,
    validationConfig,
    editButton,
    popupEdit,
    popupAddCard,
    addButton,
    updateAvatar
 } from '../utilits/constants.js';

 //log api
 const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-46',
    headers: {
        authorization: '9543ec0e-d98d-48a1-9899-998ec00e05e5',
        'Content-Type': 'application/json'
    }
 })

 let userId = null;



// creation of cards frm constants   DONE
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





//   DONE!!!!!!!!!!
const userData = new UserInfo({
    name: '.profile__name',
    about: '.profile__about',
    userAvatar: '.profile__avatar'
});

// //fullscreen function 
// function handleCardClick(name, link) { 
//     popupFullscreenPhoto.openPopup(name, link)
// }

// handler for edit profile (open popup, reset, submit)
function handleEditFormPopup() {
    const userInfo = userData.getUserInfo();
    popupEditForm.setInputsValues(userInfo);
    popupEditForm.openPopup();
    formEditProfileValidator.removeInputErrors();
}

// to add cards frm JS
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

const formAvatarValidator = new FormValidator(validationConfig, updateAvatar);
formAvatarValidator.enableValidation();

// popup fullscreen photo
const popupFullscreenPhoto = new PopupWithImage ('.popup_type_fullscreen-photo');
popupFullscreenPhoto.setEventListeners();

//popup with user profile     (!!!!!done!!!!!)
const popupEditForm = new PopupWithForm('.popup_type_edit-form', {
    submitFormHandler: (data) => {
        popupEditForm.renderLoading(true);
        api.updateUserInfo(data)
            .then((res) => {
                userData.setUserInfo(res);
                console.log('priv');
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

popupEditForm.setEventListeners();
editButton.addEventListener('click', handleEditFormPopup);

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
addButton.addEventListener('click', createUserCardHandler);

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

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, items]) => {
    userId = userInfo._id;
    
    userData.setUserInfo(userInfo);
    
    userData.setUserAvatar(userInfo);

    //items.reverse();
    // cardPhotos.addItem(cards);
    //cardPhotos.renderItems(cards);
    cardPhotos.renderItems(items.reverse());
})
.catch((err) => {
    console.log(err);
})