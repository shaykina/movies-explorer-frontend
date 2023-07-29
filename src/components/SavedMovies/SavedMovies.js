import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function SavedMovies({ onDeleteCard, setSavedMovies, savedMovies, onSavedSearch, filteredMovies, isFiltered, setIsFiltered, setFilteredMovies, isChecked }) {
  return (
    <main className="saved-movies">
      <SearchForm
        onSavedSearch={onSavedSearch}
        isChecked={isChecked}
      />
      <MoviesCardList
        onDeleteCard={onDeleteCard}
        setSavedMovies={setSavedMovies}
        savedMovies={savedMovies}
        filteredMovies={filteredMovies}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
        setFilteredMovies={setFilteredMovies}
      />
    </main>
  )
}

export default SavedMovies;
