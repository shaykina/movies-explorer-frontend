import React from 'react';
import { Link } from 'react-router-dom';

function UserNav() {
  return (
    <ul className="user-nav">
      <li className="user-nav__item">
        <Link to={'/signup'} className="user-nav__register">Регистрация</Link>
      </li>
      <li className="user-nav__item">
        <Link to={'/signin'}>
          <button className="user-nav__enter" type="button">Войти</button>
        </Link>
      </li>
    </ul>
  )
}

export default UserNav;
