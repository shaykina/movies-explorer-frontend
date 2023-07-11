import React from 'react';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" noValidate>
        <input className="search__input" type="search" name="movie" id="movie" placeholder="Фильм"
          minLength="2" maxLength="40" required />
        <button className="search__submit" type="submit"></button>
      </form>
      <label className='search__checkbox'>
        <input className='search__checkbox-input' type='checkbox' name='checkbox' id='checkbox' />
        <div className="search__checkbox-active"></div>
        <p className='search__checkbox-text'>Короткометражки</p>
      </label>
    </section>
  )
}

export default SearchForm;
