export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
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
          .then((res) => this._checkResponse(res));
        }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }

    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            about: data.about,
          }),
        })
        .then((res) => this._checkResponse(res));
    }
    
    addCard(data) {
        return fetch(`${this._url}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link,
          }),
        })
        .then((res) => this._checkResponse(res));
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: "PUT",
          headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
      }

      deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
      }

      changeUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar: data.avatar,
          }),
        })
        .then((res) => this._checkResponse(res));
      }
}