import React from 'react';
import { Link } from 'react-router-dom';

function NavPopup({ isOpen, onClose }) {
  return (
    <section className={`navpopup ${isOpen && 'navpopup_opened'}`}>
      <div className="navpopup__container">
        <button className="navpopup__close" type="button" onClick={onClose}></button>
        <div className="navpopup__nav">
          <ul className="navpopup__links">
            <li className="navpopup__item">
              <Link to={'/'} className="navpopup__link" onClick={onClose}>Главная</Link>
            </li>
            <li className="navpopup__item">
              <Link to={'/movies'} className="navpopup__link navpopup__link_current" onClick={onClose}>Фильмы</Link>
            </li>
            <li className="navpopup__item">
              <Link to={'/saved-movies'} className="navpopup__link" onClick={onClose}>Сохранённые фильмы</Link>
            </li>
          </ul>
          <Link to={'/profile'}>
            <button className="navpopup__button" type="button">Аккаунт</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NavPopup;
