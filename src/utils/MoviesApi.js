export const MOVIES_URL = 'https://api.nomoreparties.co';

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const getMovies = () => {
  return fetch(`${MOVIES_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(getResponse)
    .then((data) => {
      return data;
    })
};
