import React from 'react';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation.js';
import { Link } from 'react-router-dom';

function Header({ loggedIn }) {
  return (
    <header className={loggedIn ? 'header' : 'header header_landing'}>
      <div className='header__container'>
        <Link className="header__link" to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <Navigation
          loggedIn={loggedIn}
        />
      </div>
    </header>
  )
}

export default Header;
