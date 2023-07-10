import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import card1 from '../../images/card1.jpg';
import card2 from '../../images/card2.jpg';
import card3 from '../../images/card3.jpg';

const savedMovies = [
  {
    nameRU: '33 слова о дизайне',
    image: card1,
    savedScreen: true
  },
  {
    nameRU: 'Киноальманах «100 лет дизайна»',
    image: card2,
    savedScreen: true
  },
  {
    nameRU: 'В погоне за Бенкси',
    image: card3,
    savedScreen: true
  }
]

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        allMovies={savedMovies}
      />
    </main>
  )
}

export default SavedMovies;
