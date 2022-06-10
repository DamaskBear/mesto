const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 

// add-function class with mistake
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__error_visible');
    errorElement.textContent = errorMessage;
};

// delete- function class with mistake
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  };

// function for form's validation
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  //function for setting listeners 
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  // function for enable validation
  const enableValidation = () => {
    const formElementList = document.querySelectorAll('.popup__form');
    formElementList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

  //
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup_type_disabled');
  } else {
    buttonElement.classList.remove('popup_type_disabled');
    }
  };

//
function makeButtonDisabled(buttonElement) {
    buttonElement.classList.add('.popup_type_disabled');
    buttonElement.disabled = true
}

function resetButtonSave(popup) {
    const buttonElement = popup.querySelector('.popup__button');
    makeButtonDisabled(buttonElement);
};


  enableValidation(validateConfig);