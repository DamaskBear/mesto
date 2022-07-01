const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup_error_visible'
  }; 

//   class FormValidator {
//     constructor(dataConfig, formElement) {
//         this._form = formElement;
//         this._inputSelector = dataConfig.inputSelector;
//         this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    
//         this._submitButtonSelector = dataConfig.submitButtonSelector;
//         this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
//         this._inactiveButtonClass = dataConfig.inactiveButtonClass;
    
//         this._inputErrorClass = dataConfig.inputErrorClass;
//         this._errorClass = dataConfig.errorClass;

//     }


//   }





















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

//to check input validation 
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
    const formInputList = document.querySelectorAll(validateConfig.formSelector);
    formInputList.forEach(form => setEventListener(form, validateConfig) );
}
 
//toggle button
function toggleButtonState(input, button, validateConfig) {
    if ( !input.validity.valid ) {
        button.classList.add(validateConfig.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(validateConfig.inactiveButtonClass);
        button.disabled = false;
    }
}

// to remove errors and left text in form
function removeInputErrors(popup, validateConfig) {
    const inputsList = Array.from(popup.querySelectorAll(validateConfig.inputSelector));
    const button = popup.querySelector(validateConfig.submitButtonSelector);

    inputsList.forEach(input =>  {
        hideInputError(popup, input, validateConfig);
        toggleButtonState(input, button, validateConfig);
    });
}

// Disable a Button
function toDisableButton(buttonElement, popupValidation) {
    buttonElement.classList.add(popupValidation.inactiveButtonClass);
    buttonElement.disabled = true;
}

// refresh disabled button after re-opening adding-popup
function resetDisabledButton(popup, validateConfig) {
    const buttonElement = popup.querySelector(validateConfig.submitButtonSelector);
    toDisableButton(buttonElement, validateConfig);
}

enableValidation(validateConfig);