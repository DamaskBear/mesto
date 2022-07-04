export class FormValidator {
    constructor(data, formElement) {
        this._inputSelector = data.inputSelector;
        this._form = formElement;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._submitButtonSelector = data.submitButtonSelector;
        this._btnSubmit = this._form.querySelector(this._submitButtonSelector);
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    };

        // function adds class with mistake
    _showInputError(inputElement) {
        inputElement.classList.add(this._inputErrorClass);

        const errorMessage = this._form.querySelector(`.${inputElement.id}-input-error`);
        errorMessage.textContent = inputElement.validationMessage;
        errorMessage.classList.add(this._errorClass);
    };

    // function deletes class with mistake
    _hideInputError(inputElement) {
        inputElement.classList.remove(this._inputErrorClass);

        const errorMessage = this._form.querySelector(`.${inputElement.id}-input-error`);
        errorMessage.classList.remove(this._errorClass);
        errorMessage.textContent = '';
    };

    // function checks form validity 
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
        } else {
        this._hideInputError(inputElement);
        }
    };

    //function checks corrective input form 
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    // toggle button
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._btnSubmit.disabled = true;
            this._btnSubmit.classList.add(this._inactiveButtonClass);
          } else {
            this._btnSubmit.disabled = false;
            this._btnSubmit.classList.remove(this._inactiveButtonClass);
          }
    };

    //function adds listeners to all input forms
    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
      });
    });
    };

    //function finds and sorts out all forms
    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    };

    //function for reseting mistakes in forms
    removeInputErrors() {
        const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._toggleButtonState(inputList);

        inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        });
    };
}