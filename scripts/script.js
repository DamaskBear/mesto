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

const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const saveButton = document.querySelector('.popup__input_save-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup__type_edit');
const placePopup = document.querySelector(".popup__card_place");
const cardsContainer = document.querySelector(".elements__card");
const binButton = document.querySelector(".elements__pic-bin");
const cardTemplate = document.querySelector(".card-template").content;
const editNameElement = document.querySelector('.popup__input_name');
const prevUsName = document.querySelector(".profile__info-name");
const editJobElement = document.querySelector('.popup__input_job');
const prevUsJob = document.querySelector(".profile__info-role");
const closeButtonPlace = document.querySelector('.popup__close-button_place');

const userName = document.querySelector('.popup__input_name');
const userJob = document.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const popupEdit = document.querySelector('.popup_type_edit-form');
const profileAbout = document.querySelector('.profile__about');



function openPopup(popup) {
    popup.classList.add('.popup_opened');
}


function closePopup(popup) {
    popup.classList.remove('.popup_opened');
}

function handleFillEditModal() {
    userName.value = profileName.textContent;
    userJob.value = profileAbout.textContent;
    openModal(popupEdit);
}


closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);



// submit for profile edit
// function formSubmitHandler (evt) {
//     evt.preventDefault(); 
//     let nameInput = formElement.querySelector('.popup__input_name');
//     let jobInput = formElement.querySelector('.popup__input_job');

//     let nameInputValue = nameInput.value;
//     let jobInputValue = jobInput.value;

//     let name = document.querySelector('.profile__name');
//     let job = document.querySelector('.profile__about');

//     name.textContent = nameInputValue;
//     job.textContent = jobInputValue;
//     closePopup();
// }








































// TO, 4to pisal vchera!!!

// function edData() {
//     popup.classList.add('popup_opened');
//     editNameElement.value = prevUsName.textContent;
//     editJobElement.value = prevUsJob.textContent;
// }

// editButton.addEventListener("click", edData);

// function closeUs() {
//     popup.classList.remove('.popup_opened');
// }

// closeButton.addEventListener("click", closeUs);

// function saveUs(evt) {
//     evt.preventDefault();
//     prevUsName.textContent = editNameElement.value;
//     prevUsJob.textContent = editJobElement.value;
//     closeUs();
// }

// saveButton.addEventListener("click", saveUs);

// function addPlace() {
//     placePopup.classList.add("popup_opened");
//   }

//   addButton.addEventListener("click", addPlace);
  
//   function closePlace() {
//     placePopup.classList.remove("popup_opened");
//   }

//   closeButtonPlace.addEventListener("click", closePlace);










// // open and close edit button
// function openPopup () {
//     popup.classList.add('popup_opened');
// }

// function closePopup () {
//     popup.classList.remove('popup_opened');
// }

// editButton.addEventListener('click', openPopup);
// closeButton.addEventListener('click', closePopup);

// // open and close add button
// function openAddButton () {
//     placePopup.classList.add('popup_opened');
// }

// function closeAddButton () {
//     placePopup.classList.remove('popup_opened');
// }

// addButton.addEventListener('click', openAddButton );
// closeButton.addEventListener('click', closeAddButton);

// edit toggle

// const editButton = document.querySelector('.profile__edit-button');
// editButton.addEventListener('click', (args) => {
//     popup.classList.toggle('popup_opened');
// });

// add toggle

// const addButton = document.querySelector('.profile__add-button');
// addButton.addEventListener('click', (args) => {
//     placePopup.classList.toggle('popup_opened');
// });


// // close-button for all elements

// function closePopup(args) {
//     let button = args.target;
//     let popupElement = button.closest('.popup');
//     popupElement.classList.toggle('popup_opened');
// }

// document.querySelectorAll('.popup__close-button').forEach((button) => {
//     button.addEventListener('click', closePopup);
// });




// formElement.addEventListener('submit', formSubmitHandler);

// submit for cards

// function formSubmitPlace (evt) {
//     evt.preventDefault(); 
//     let namePlace = document.querySelector('.popup__input_place');
//     let link = document.querySelector('.popup__input_link');

//     let namePlaceInputValue = nameInput.value;
//     let linkInputValue = linkInput.value;

//     namePlace.textContent = namePlaceInputValue;
//     link.textContent = linkInputValue;

//     addCard(namePlace.value, link.value);
//     namePlace.value = "";
//     link.value = "";
//     closePopup();
// }

// formElement.addEventListener('submit', formSubmitPlace); 








// add cards 
// function addCard(nameValue, linkValue) {
//     const cardElement = cardTemplate
//       .querySelector('.elements__item')
//       .cloneNode(true);
//     cardElement.querySelector('.elements__photo').src = linkValue;
//     cardElement.querySelector('.elements__name').textContent = nameValue;
//     cardElement
//       .querySelector('.elements__like-button')
//       .addEventListener('click', function(evt) {
//         evt.target.classList.toggle('elements__like-button_active');
//       });
//       cardElement
//       .querySelector('.elements__pic-bin')
//       .addEventListener('click', function(evt) { 
//         evt.target.closest('.elements__item').remove();
//       });
//       cardsContainer.prepend(cardElement);
// }



// // like and bin function
//  initialCards.forEach(function (item) {
//      const cardElement = cardTemplate.cloneNode(true);
//      cardElement.querySelector('.elements__name').textContent = item.name;
//      cardElement.querySelector('.elements__photo').src = item.link;
//      cardElement
//          .querySelector('.elements__like-button')
//          .addEventListener('click', function(evt) {
//              evt.target.classList.toggle('elements__like-button_active');
//          });
//      cardElement
//          .querySelector('.elements__pic-bin')
//          .addEventListener('click', function(evt) {
//            evt.target.closest('.elements__item').remove();
//          });
//     cardsContainer.prepend(cardElement);
//  });

 // addition and save of new cards from the form

//  const saveCardButton = document.querySelector('.popup__form_place');

//  saveCardButton.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     const name = document.querySelector('.popup__input_place');
//     const link = document.querySelector('.popup__input_link');
//     addCard(name.value, link.value);
//     name.value = "";
//     link.value = "";
//     closePopup();
//  });
