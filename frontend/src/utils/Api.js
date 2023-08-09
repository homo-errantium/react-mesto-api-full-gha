class Api {
    constructor({ headers, baseUrl }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }

    getUserInfo() {
        const token = localStorage.getItem('token');
        const requestUrl = this._baseUrl + '/users/me';
        return fetch(requestUrl, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    getInitialCards() {
        const token = localStorage.getItem('token');
        const requestUrl = this._baseUrl + '/cards';
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    getServerData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }

    setUserInfo(body) {
        const token = localStorage.getItem('token');
        const requestUrl = this._baseUrl + '/users/me';
        return fetch(requestUrl, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }).then(this._checkResponse);
    }

    addNewCard(body) {
        const token = localStorage.getItem('token');
        const requestUrl = this._baseUrl + '/cards';
        return fetch(requestUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('token');
        const requestUrl = this._baseUrl + `/cards/${cardId}`;
        return fetch(requestUrl, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    addCardLike(cardId) {
        const token = localStorage.getItem('token');
        const requestUrl = this._baseUrl + `/cards/${cardId}/likes`;
        return fetch(requestUrl, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    deleteCardLike(cardId) {
        const token = localStorage.getItem('token');
        const requestUrl = this._baseUrl + `/cards/${cardId}/likes`;
        return fetch(requestUrl, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    setProfileAvatar(body) {
        const token = localStorage.getItem('token');
        const requestUrl = this._baseUrl + `/users/me/avatar`;
        return fetch(requestUrl, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }).then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'https://api.my.place.nomoreparties.co',
});

export default api;
