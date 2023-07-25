import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSubmit, onSavedSearch, isChecked, keyword }) {

  const [searchError, setSearchError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [searchMoviesTerm, setSearchMoviesTerm] = React.useState(keyword);
  const [searchSavedTerm, setSearchSavedTerm] = React.useState('');
  const [checkedMovies, setCheckedMovies] = React.useState(isChecked);
  const [checkedSaved, setCheckedSaved] = React.useState(false);
  const formRef = React.useRef();

  const location = useLocation().pathname;

  const checked = location === '/movies' ? checkedMovies : checkedSaved;
  const setChecked = location === '/movies' ? setCheckedMovies : setCheckedSaved;
  const searchTerm = location === '/movies' ? searchMoviesTerm : searchSavedTerm;
  const setSearchTerm = location === '/movies' ? setSearchMoviesTerm : setSearchSavedTerm;


  React.useEffect(() => {
    if (location === '/movies') {
      localStorage.setItem('checked', JSON.stringify(checked));
      localStorage.setItem('keyword', searchTerm);
    }
  }, [checked, location, searchTerm]);

  React.useEffect(() => {
    if (location === '/movies') {
      const storedChecked = localStorage.getItem('checked');
      if (storedChecked !== null) {
        setChecked(JSON.parse(storedChecked));
      }
      const storedKeyword = localStorage.getItem('keyword');
      if (storedKeyword !== null) {
        setSearchTerm(storedKeyword);
      }
    }
  }, [location]);

  React.useEffect(() => {
    if (isFormValid && formRef.current) {
      setIsFormValid(false);
    }
  }, [isFormValid, onSubmit]);

  function validateInput(inputElement) {
    if (!inputElement.validity.valid) {
      setSearchError("Нужно ввести ключевое слово");
    } else {
      setSearchError("");
    }
  }

  function handleSearchInput(evt) {
    setSearchTerm(evt.target.value);
    validateInput(evt.target);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const inputElement = evt.target.elements.movie;
    validateInput(inputElement);
    if (inputElement.validity.valid) {
      onSubmit(inputElement.value, checked);
    }
    setIsFormValid(inputElement.validity.valid);
    formRef.current = evt.target;
  }

  function handleSavedSubmit(evt) {
    evt.preventDefault();
    const inputElement = evt.target.elements.movie;
    validateInput(inputElement);
    if (inputElement.validity.valid) {
      onSavedSearch(inputElement.value, checked);
    }
    setIsFormValid(inputElement.validity.valid);
    formRef.current = evt.target;
  }

  function handleChecking() {
    setChecked(!checked);
    if (location === '/movies') {
      onSubmit(searchTerm, !checked);
    } else {
      onSavedSearch(searchTerm, !checked);
    }
  }

  return (
    <section className="search">
      <form className="search__form" name="search" onSubmit={location === '/movies' ? handleSubmit : handleSavedSubmit} noValidate>
        <input className={`search__input ${searchError ? "search__input_error" : ""}`} type="text" name="movie" id="movie" placeholder="Фильм" onInput={handleSearchInput}
          minLength="2" maxLength="40" value={searchTerm || ''} required />
        <span className={`search__error ${searchError ? "search__error_visible" : ""}`}>{searchError}</span>
        <button className="search__submit" type="submit" disabled={searchError}></button>
      </form>
      <label className='search__checkbox'>
        <input className='search__checkbox-input' onChange={handleChecking} type='checkbox' name='checkbox' id='checkbox' checked={checked} />
        <div className="search__checkbox-active"></div>
        <p className='search__checkbox-text'>Короткометражки</p>
      </label>
    </section>
  )
}

export default SearchForm;
