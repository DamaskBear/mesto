const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup_error_visible'
  }; 


  //function which showes errors
function showInputError(form, inputElement, validateConfig) {
    inputElement.classList.add(validateConfig.inputErrorClass);

    const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
    const button = form.querySelector(validateConfig.submitButtonSelector);

    errorMessage.classList.add(validateConfig.errorClass);
    errorMessage.textContent = inputElement.validationMessage;
    toggleButtonState(inputElement, button, validateConfig);
}

//function hide-errors
function hideInputError(form, inputElement, validateConfig) {
    inputElement.classList.remove(validateConfig.inputErrorClass);

    const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
    const button = form.querySelector(validateConfig.submitButtonSelector);

    errorMessage.classList.remove(validateConfig.errorClass);
    errorMessage.textContent = '';
    toggleButtonState(inputElement, button, validateConfig);
}

// is it Valid?
function checkInputValidity(form, inputElement, validateConfig) {
    if (!inputElement.validity.valid) {
        showInputError(form, inputElement, validateConfig);
    } else {
        hideInputError(form, inputElement, validateConfig);
    }
}

 //lets set listeners!
function setEventListener(form, validateConfig) {
    const inputsList = Array.from(form.querySelectorAll(validateConfig.inputSelector));
    inputsList.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, validateConfig);
        });
    });
}

function enableValidation(validateConfig) {
    const formList = document.querySelectorAll(validateConfig.formSelector);
    formList.forEach(form => setEventListener(form, validateConfig) );
}

function toggleButtonState(input, button, validateConfig) {
    if ( !input.validity.valid ) {
        button.classList.add(validateConfig.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(validateConfig.inactiveButtonClass);
        button.disabled = false;
    }
}

function removeInputErrors(popup, validateConfig) {
    const inputsList = Array.from(popup.querySelectorAll(validateConfig.inputSelector));
    const button = popup.querySelector(validateConfig.submitButtonSelector);

    inputsList.forEach(input =>  {
        hideInputError(popup, input, validateConfig);
        toggleButtonState(input, button, validateConfig);
    });
}

// function makeButtonInvalid(buttonElement,validateConfig) {
//     buttonElement.classList.add(validateConfig.inactiveButtonClass);
//     buttonElement.disabled = true
// }

enableValidation(validateConfig);





