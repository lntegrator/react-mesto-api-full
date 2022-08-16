const BASE_URL = 'https://api.integrator.nomoredomains.sbs'

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
}


export const registration = (password, email) => {
    return fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
    .then(checkResponse);
}

export const authorization = (password, email) => {
    return fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
    .then(checkResponse);
}

export const checkToken = token => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(checkResponse)
    .catch((err) => console.log(err))
}