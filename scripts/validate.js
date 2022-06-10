const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup_error_visible'
  }; 

// // add-function class with mistake
// const showInputError = (formElement, inputElement, errorMessage, validateConfig) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(validateConfig.inputErrorClass);
//     errorElement.classList.add(validateConfig.errorClass);
//     errorElement.textContent = errorMessage;
// };

// // delete- function class with mistake
// const hideInputError = (formElement, inputElement, validateConfig) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(validateConfig.inputErrorClass);
//     errorElement.classList.remove(validateConfig.errorClass);
//     errorElement.textContent = '';
//   };

// // function for form's validation
// const checkInputValidity = (formElement, inputElement, validateConfig) => {
//     if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage, validateConfig);
//     } else {
//       hideInputError(formElement, inputElement);
//     }
//   };

//   //function for setting listeners 
//   const setEventListeners = (formElement, validateConfig) => {
//     const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
//     const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);
//     toggleButtonState(inputList, buttonElement);
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', function () {
//         checkInputValidity(formElement, inputElement);
//         toggleButtonState(inputList, buttonElement);
//       });
//     });
//   };
//   // function for enable validation
//   const enableValidation = (validateConfig) => {
//     const formElementList = document.querySelectorAll(validateConfig.formSelector);
//     formElementList.forEach((formElement) => {
//         setEventListeners(formElement);
//     });
// };

//   //
//   function hasInvalidInput(inputList) {
//     return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// //
// function toggleButtonState(inputList, buttonElement,validateConfig) {
//     if (hasInvalidInput(inputList)) {
//       buttonElement.classList.add(validateConfig.inactiveButtonClass);
//   } else {
//     buttonElement.classList.remove(validateConfig.inactiveButtonClass);
//     }
//   };

// //
// function makeButtonDisabled(buttonElement,validateConfig) {
//     buttonElement.classList.add(validateConfig.inactiveButtonClass);
//     buttonElement.disabled = true
// }

// function resetButtonSave(popup,validateConfig) {
//     const buttonElement = popup.querySelector(validateConfig.submitButtonSelector);
//     makeButtonDisabled(buttonElement);
// };


//   enableValidation(validateConfig);



function showInputError(form, inputElement, config) {
    inputElement.classList.add(config.inputErrorClass);

    const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
    const button = form.querySelector(config.submitButtonSelector);

    errorMessage.classList.add(config.errorClass);
    errorMessage.textContent = inputElement.validationMessage;
    toggleButtonState(inputElement, button, config);
}

function hideInputError(form, inputElement, config) {
    inputElement.classList.remove(config.inputErrorClass);

    const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
    const button = form.querySelector(config.submitButtonSelector);

    errorMessage.classList.remove(config.errorClass);
    errorMessage.textContent = '';
    toggleButtonState(inputElement, button, config);
}

function isValid(form, inputElement, config) {
    if (!inputElement.validity.valid) {
        showInputError(form, inputElement, config);
    } else {
        hideInputError(form, inputElement, config);
    }
}

function setEventListener(form, config) {
    const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
    inputsList.forEach(input => {
        input.addEventListener('input', () => {
            isValid(form, input, config);
        });
    });
}

function toggleButtonState(input, button, config) {
    if ( !input.validity.valid ) {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    }
}

function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach(form => setEventListener(form, config) );
}

function removeErrors(modal, config) {
    const inputsList = Array.from(modal.querySelectorAll(config.inputSelector));
    const button = modal.querySelector(config.submitButtonSelector);

    inputsList.forEach(input =>  {
        hideInputError(modal, input, config);
        toggleButtonState(input, button, config);
    });
}

function makeButtonDisabled(buttonElement,validateConfig) {
    buttonElement.classList.add(validateConfig.inactiveButtonClass);
    buttonElement.disabled = true
}

function resetButtonSave(popup,validateConfig) {
    const buttonElement = popup.querySelector(validateConfig.submitButtonSelector);
    makeButtonDisabled(buttonElement);
};

enableValidation(validateConfig);