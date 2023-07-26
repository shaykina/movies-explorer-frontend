import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Movies/Preloader/Preloader.js';

function Movies({ onSubmit, isLoading, errorMessage, isSearched, windowWidth, onSave, setSavedMovies, onDeleteCard, isFiltered, setIsFiltered, isChecked, keyword, movies, setMovies }) {
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
          isSearched && movies.length === 0 ?
            <p className="movies__error-text">Ничего не найдено</p> :
            <MoviesCardList
              windowWidth={windowWidth}
              onSave={onSave}
              setSavedMovies={setSavedMovies}
              onDeleteCard={onDeleteCard}
              isFiltered={isFiltered}
              setIsFiltered={setIsFiltered}
              movies={movies}
              setMovies={setMovies}
            />
        )}
      {errorMessage && <p className="movies__error-text">{errorMessage}</p>}
    </main>
  )
}

export default Movies;
