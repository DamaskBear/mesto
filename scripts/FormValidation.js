export class FormValidator {
    constructor(selectors, formElement) {
        this._selectors = selectors;
        this._submitButton = formElement.querySelector(selectors.submitButtonSelector);
        this._formElement = formElement;
    }

        // Функция, которая добавляет класс с ошибкой
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.classList.add(this._selectors.errorClass);
        errorElement.textContent = errorMessage;
    };

    // Функция, которая удаляет класс с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = " ";
    };

    // Функция, которая проверяет валидность поля
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        this._showInputError(inputElement, inputElement.validationMessage);
        } else {
        // Если проходит, скроем
        this._hideInputError(inputElement);
        }
    };

    //проверяем поля ввода на корректность
    _hasInvalidInput(inputList) {
        return inputList.some(input => !input.validity.valid)
    };

    //функция изменения состояния кнопки
    _toggleButtonState(inputList) {
        if (this._hasInvalidInput(inputList)) {
        this._submitButton.classList.add(this._selectors.inactiveButtonClass);
        this._submitButton.setAttribute("disabled", true);
        } else {
        this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
        this._submitButton.removeAttribute("disabled");
        }
    };

    //функция добавляет обработчики сразу всем полям формы
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._toggleButtonState(inputList);
        inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(inputList);
        });
        });
    };

    //находим и перебираем все формы на странице
    enableValidation() {
        this._setEventListeners();
    }

    //Функция сброса ошибок
    restartFormValidation() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._toggleButtonState(inputList);

        inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        });
    }

























//   //function which showes errors
//     _showInputError(form, inputElement, validateConfig) {
//         inputElement.classList.add(validateConfig.inputErrorClass);

//         const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
//         const button = form.querySelector(validateConfig.submitButtonSelector);

//         errorMessage.classList.add(validateConfig.errorClass);
//         errorMessage.textContent = inputElement.validationMessage;
//         toggleButtonState(inputElement, button, validateConfig);
//     }

// //function hide-errors
//     _hideInputError(form, inputElement, validateConfig) {
//         inputElement.classList.remove(validateConfig.inputErrorClass);

//         const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
//         const button = form.querySelector(validateConfig.submitButtonSelector);

//         errorMessage.classList.remove(validateConfig.errorClass);
//         errorMessage.textContent = '';
//         toggleButtonState(inputElement, button, validateConfig);
//     }

//     //to check input validation 
//     _checkInputValidity(form, inputElement, validateConfig) {
//         if (!inputElement.validity.valid) {
//             showInputError(form, inputElement, validateConfig);
//         } else {
//             hideInputError(form, inputElement, validateConfig);
//         }
//     }

//      //lets set listeners!
//     _setEventListener(form, validateConfig) {
//         const inputsList = Array.from(form.querySelectorAll(validateConfig.inputSelector));
//         inputsList.forEach(input => {
//             input.addEventListener('input', () => {
//                 checkInputValidity(form, input, validateConfig);
//             });
//         });
//     }

//     enableValidation(validateConfig) {
//         const formInputList = document.querySelectorAll(validateConfig.formSelector);
//         formInputList.forEach(form => setEventListener(form, validateConfig) );
//     }

//     //toggle button
//     _toggleButtonState(input, button, validateConfig) {
//         if (this._hasInvalidInput()) {
//             this. toDisableButton()
//         } else {
//             this._buttonElement.classList.remove(this._form.inactiveButtonClass);
//             this._buttonElement.disabled = false;
//         }
//     }

//     // Disable a Button
//     toDisableButton(buttonElement, popupValidation) {
//         buttonElement.classList.add(popupValidation.inactiveButtonClass);
//         buttonElement.disabled = true;
//     }

//         // to remove errors and left text in form
//     removeInputErrors(popup, validateConfig) {
//         const inputsList = Array.from(popup.querySelectorAll(validateConfig.inputSelector));
//         const button = popup.querySelector(validateConfig.submitButtonSelector);

//         inputsList.forEach(input =>  {
//             hideInputError(popup, input, validateConfig);
//             toggleButtonState(input, button, validateConfig);
//         });
//     }

//         // refresh disabled button after re-opening adding-popup
//     resetDisabledButton(popup, validateConfig) {
//         const buttonElement = popup.querySelector(validateConfig.submitButtonSelector);
//         toDisableButton(buttonElement, validateConfig);
//     }
}










 






