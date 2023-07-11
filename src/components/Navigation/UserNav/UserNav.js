import React from 'react';
import { Link } from 'react-router-dom';

function UserNav() {
  return (
    <ul className="user-nav">
      <li className="user-nav__item">
        <Link to={'/signup'} className="user-nav__register">Регистрация</Link>
      </li>
      <li className="user-nav__item">
        <Link to={'/signin'} className="user-nav__enter">Войти</Link>
      </li>
    </ul>
  )
}

export default UserNav;
