import { myToken } from './constants.js'

class Api{
    constructor(headers, baseUrl){
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getInfo(){
        return this._sendRequest(fetch(`${this._baseUrl}/users/me`, 
        {
            method: 'GET',
            headers: this._headers
        }))
    }

    getCards(){
        return this._sendRequest(
            fetch(`${this._baseUrl}/cards`,{
            method: 'GET',
            headers: this._headers
        }))
    }

    postCard(cardInfo){
        return this._sendRequest(fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.title,
                link: cardInfo.link
            })
        }))
    }

    patchInfo(info){
        return this._sendRequest(fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        }))
    }

    patchAvatar(link){
        return this._sendRequest(fetch(`${this._baseUrl}/users/me/avatar `, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }))
    }

    deleteCard(id){
        return this._sendRequest(fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }))
    }

    likeCard(id){
        return this._sendRequest(fetch(`${this._baseUrl}/cards/${id}/likes `, {
            method: 'PUT',
            headers: this._headers
        }))
    }

    unlikeCard(id){
        return this._sendRequest(fetch(`${this._baseUrl}/cards/${id}/likes `, {
            method: 'DELETE',
            headers: this._headers
        }))
    }

    _sendRequest(promise){
        return promise
            .then((res) => {
                if (res.ok){
                    return res.json()
                }
                Promise.reject(`Ошибка ${res.status}`);
            })
            .then((res) => {
                return res
            })
    }

}

const api = new Api({
    authorization: myToken,
    'Content-Type': 'application/json'
}, 'https://api.integrator.nomoredomains.sbs')

export {api}