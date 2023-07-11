import React from 'react';
import { Link } from 'react-router-dom';
import NavPopup from './NavPopup/NavPopap.js';

function MovieNav() {

  const [isNavPopupOpen, setIsNavPopupOpen] = React.useState(false);

  function handleNavButtonClick() {
    setIsNavPopupOpen(true);
  }

  function closeNavPopup() {
    setIsNavPopupOpen(false);
  }

  return (
    <>
      <ul className="movie-nav">
        <li className="movie-nav__item">
          <Link to={'/movies'} className="movie-nav__link">Фильмы</Link>
        </li>
        <li className="movie-nav__item">
          <Link to={'/saved-movies'} className="movie-nav__link movie-nav__link_saved">Сохранённые фильмы</Link>
        </li>
        <li className="movie-nav__item">
          <Link to={'/profile'}>
            <button className="movie-nav__button" type="button">Аккаунт</button>
          </Link>
        </li>
        <li className="movie-nav__mobile-menu">
          <button className="movie-nav__mobile-button" onClick={handleNavButtonClick} type="button"></button>
        </li>
      </ul>
      <NavPopup
        isOpen={isNavPopupOpen}
        onClose={closeNavPopup}
      />
    </>
  )
}

export default MovieNav;
