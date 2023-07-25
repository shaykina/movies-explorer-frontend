import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Movies/Preloader/Preloader.js';

function Movies({ onSubmit, isLoading, errorMessage, isSearched, windowWidth, onSave, setSavedMovies, onDeleteCard, isFiltered, setIsFiltered, isChecked, keyword }) {
  const storedMovies = localStorage.getItem('movies');
  const parsedMovies = JSON.parse(storedMovies || '[]');

  return (
    <main className="movies">
      <SearchForm
        onSubmit={onSubmit}
        isChecked={isChecked}
        keyword={keyword}
      />
      {isLoading ?
        <Preloader /> :
        (
          isSearched && parsedMovies.length === 0 ?
            <p className="movies__error-text">Ничего не найдено</p> :
            <MoviesCardList
              windowWidth={windowWidth}
              onSave={onSave}
              setSavedMovies={setSavedMovies}
              onDeleteCard={onDeleteCard}
              isFiltered={isFiltered}
              setIsFiltered={setIsFiltered}
            />
        )}
      {errorMessage && <p className="movies__error-text">{errorMessage}</p>}
    </main>
  )
}

export default Movies;
