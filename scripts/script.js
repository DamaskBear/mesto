// edits
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup__type_edit');
const popupEdit = document.querySelector('.popup_type_edit-form');
const editForm = popupEdit.querySelector('.popup__form_type_edit');
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

// open popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
//close popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
//
function editFormPopupHandler() {
    userName.value = profileName.textContent;
    userJob.value = profileAbout.textContent;
    openPopup(popupEdit);
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

//like
function likeCardHandler(evt) {
    evt.target.classList.toggle('elements__like-button_active');
}

//delete button for cards
function deleteCardHandler(evt) {
    evt.target.closest('.elements__item').remove();
}

// fullscreen function
function showFullscreenHandler(cardData) {
    fullscreenPhoto.src = cardData.link;
    fullscreenCaption.textContent = cardData.name;
    fullscreenPhoto.alt = `Фото: ${cardData.name}`

    openPopup(popupFullscreen);
}

// to add cards frm JS
function createCard(cardData) {

    const cardTemplate = document.querySelector(".card-template").content;
    const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardPhoto = cardItem.querySelector('.elements__photo');
    const cardPhotoName = cardItem.querySelector('.elements__name');
    const btnCardLike = cardItem.querySelector('.elements__like-button');
    const btnCardDelete = cardItem.querySelector('.elements__pic-bin');

    cardPhoto.src = cardData.link;
    cardPhotoName.textContent = cardData.name;
    cardPhoto.alt = `Фото: ${cardData.name}`;

    cardPhoto.addEventListener('click', () => {
        showFullscreenHandler(cardData);
    });

    btnCardLike.addEventListener('click', likeCardHandler);

    btnCardDelete.addEventListener('click', deleteCardHandler);

    return cardItem;
}

// creation of new card
function createUserCardHandler(evt) {
    evt.preventDefault();

    const newCard = {};
    newCard.name = inputPlaceName.value;
    newCard.link = inputPlaceLink.value;

    renderCard(newCard, cardsList);
    cardFormAdd.reset();

    closePopup(popupAddCard);
}

function renderCard(cardData, element) {
    const newCard = createCard(cardData);
    element.prepend(newCard);
}

// slu6ateli
formElement.addEventListener('submit', submitFormHandler);

editButton.addEventListener('click', editFormPopupHandler);

addButton.addEventListener('click', () => openPopup(popupAddCard));

cardFormAdd.addEventListener('submit', createUserCardHandler);

// to close popup windows
popupCloseEdit.addEventListener('click', () => {
    closePopup(popupEdit);
});

popupCloseAdd.addEventListener('click', () => {
    closePopup(popupAddCard);
});

popupCloseFullscreen.addEventListener('click', () => {
    closePopup(popupFullscreen);
});

// cards frm js
initialCards.forEach(item => renderCard(item, cardsList));