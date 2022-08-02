export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
          })
          .then(this._checkResponse);
        }
        
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkResponse);
    }

    changeUserInfo({ name, position }) {
        return fetch(`${this._url}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: position,
          }),
        })
        .then(this._checkResponse);
    }
    
    addCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            link: link,
          }),
        })
        .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
        })
        .then(this._checkResponse);
    }

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: "PUT",
          headers: this._headers,
        })
        .then(this._checkResponse);
      }

      deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._headers,
        }).then(this._checkResponse);
      }

      changeUserAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatar,
          }),
        })
        .then(this._checkResponse);
      }
}