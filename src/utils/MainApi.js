export const MAIN_URL = 'https://api.movies-shaykina.nomoredomains.rocks';

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const saveMovie = (card) => {
  return fetch(`${MAIN_URL}/movies`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: card.imageUrl,
      trailerLink: card.trailerLink,
      thumbnail: card.imageUrl,
      movieId: card.movieId,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    })
  })
    .then(getResponse)
    .then((data) => {
      return data;
    })
};

export const deleteMovie = (id) => {
  return fetch(`${MAIN_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(getResponse)
};

export const getSavedMovies = () => {
  return fetch(`${MAIN_URL}/movies`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(getResponse)
    .then((data) => {
      return data;
    })
};

export const register = (name, email, password) => {
  return fetch(`${MAIN_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(getResponse)
    .then((data) => {
      return data;
    })
};

export const authorize = (email, password) => {
  return fetch(`${MAIN_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(getResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
};

export const checkToken = (token) => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(getResponse)
    .then(data => data)
}

export const getCurrentUser = () => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(getResponse)
    .then(data => data)
}

export const updateUserInfo = (name, email) => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
    .then(getResponse)
    .then((data) => {
      return data;
    })
};
