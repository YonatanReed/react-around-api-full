class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _processResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._processResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._processResponse);
  }

  updateUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._processResponse);
  }

  uploadCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._processResponse);
  }

  likeCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._processResponse);
  }

  unLikeCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._processResponse);
  }

  updateAvatar(link, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._processResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._processResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
    return isLiked ? this.likeCard(id, token) : this.unLikeCard(id, token);
  }
}

const api = new Api({
  baseUrl: "https://api.yonatanreed.mooo.com",
});

export default api;
