import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../../index.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Footer from '../Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Helmet>
          <html lang="en" />
        </Helmet>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          } />
          <Route path="/movies" element={
            <>
              <Header
                loggedIn={true}
              />
              <Movies />
              <Footer />
            </>
          } />
          <Route path="/saved-movies" element={
            <>
              <Header
                loggedIn={true}
              />
              <SavedMovies />
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header
                loggedIn={true}
              />
              <Profile />
            </>
          } />
          <Route path="/signup" element={
            <Register />
          } />
          <Route path="/signin" element={
            <Login />
          } />
          <Route path="/*"
            element={
              <NotFound />
            } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
