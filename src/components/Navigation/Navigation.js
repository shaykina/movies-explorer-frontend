import React from 'react';
import UserNav from './UserNav/UserNav.js';
import MovieNav from './MovieNav/MovieNav.js';

function Navigation({ loggedIn }) {
  return (
    <nav className="navigation">
      {(loggedIn) && <MovieNav />}
      {(!loggedIn) && <UserNav />}
    </nav>
  )
}

export default Navigation;
