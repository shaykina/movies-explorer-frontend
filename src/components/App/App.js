import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import * as api from '../../utils/MoviesApi.js';
import * as mainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';

function App() {

  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSearched, setIsSearched] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: ''
  });
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [info, setInfo] = React.useState({
    name: '',
    email: '',
  });
  const [savedMovies, setSavedMovies] = React.useState(() => JSON.parse(localStorage.getItem('saved') || '[]'));
  const [filteredMovies, setFilteredMovies] = React.useState(() => JSON.parse(localStorage.getItem('filtered') || '[]'));
  const [isChecked, setIsChecked] = React.useState(() => JSON.parse(localStorage.getItem('checked') || 'false'));
  const [keyword, setKeyword] = React.useState(() => localStorage.getItem('keyword') || '');

  const navigate = useNavigate();

  function handleTokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token).then(() => {
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
      })
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
    const saved = JSON.parse(localStorage.getItem('saved') || '[]');
    setSavedMovies(saved);
    const filtered = JSON.parse(localStorage.getItem('filtered') || '[]');
    setSavedMovies(filtered);
  }, [])

  React.useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(savedMovies));
  }, [savedMovies]);

  React.useEffect(() => {
    localStorage.setItem('filtered', JSON.stringify(filteredMovies));
  }, [filteredMovies]);

  React.useEffect(() => {
    if (loginInfo.email && loginInfo.password) {
      handleLogin();
    }
  }, [loginInfo]);

  React.useEffect(() => {
    if (isLoggedIn) {
      handleGettingSavedCards();
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleWindowResize);
      mainApi.getCurrentUser().then((user) => {
        setCurrentUser(user);
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn])

  function handleLogin() {
    if (!loginInfo.email || !loginInfo.password) {
      return;
    }

    mainApi.authorize(loginInfo.email, loginInfo.password)
      .then((data) => {
        if (data.token) {
          setLoginInfo({ email: '', password: '' });
          handleTokenCheck();
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister() {
    mainApi.register(formValue.name, formValue.email, formValue.password)
      .then(() => {
        setLoginInfo({ email: formValue.email, password: formValue.password });
        handleLogin();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    localStorage.removeItem('movies');
    localStorage.removeItem('keyword');
    localStorage.removeItem('checked');
    setIsChecked(false);
    setKeyword('');
  }

  function updateUserInfo() {
    mainApi.updateUserInfo(info.name, info.email)
      .then(() => {
        setInfo({ name: '', email: '' });
        setCurrentUser(info);
      })
  }

  let resizeTimeout;
  function handleWindowResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 200);
  }

  function handleSearchSubmit(searchTerm, checked) {
    setIsLoading(true);
    setIsChecked(checked);
    setKeyword(searchTerm);
    api.getMovies(searchTerm)
      .then((movies) => {
        let filteredMovies = movies.filter((movie) => {
          return (
            movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.director.toLowerCase().includes(searchTerm.toLowerCase())
          )
        });
        if (checked) {
          filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
        }
        localStorage.removeItem('movies');
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        setIsSearched(true);
        if (filteredMovies) {
          setMovies(filteredMovies);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSavedSearch(searchTerm, checked) {
    const saved = JSON.parse(localStorage.getItem('saved') || '[]');
    setSavedMovies(saved);
    setIsChecked(checked);
    let filteredMovies = savedMovies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      )
    });
    if (checked) {
      filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
    }
    localStorage.removeItem('filtered');
    localStorage.setItem('filtered', JSON.stringify(filteredMovies));
    if (filteredMovies) {
      setFilteredMovies(filteredMovies);
      setIsFiltered(true);
    }
  }

  function handleSavingCard(card) {
    mainApi.saveMovie(card)
      .then((newCard) => {
        const updatedSavedMovies = [newCard, ...savedMovies];
        if (updatedSavedMovies) {
          localStorage.removeItem('saved');
          localStorage.setItem('saved', JSON.stringify(updatedSavedMovies));
          setSavedMovies(updatedSavedMovies);
        }
        return updatedSavedMovies;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGettingSavedCards() {
    mainApi.getSavedMovies()
      .then((movies) => setSavedMovies(movies))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteSavedCard(card) {
    mainApi.deleteMovie(card.movieId)
      .then(() => {
        handleGettingSavedCards();
        const updatedSavedMovies = savedMovies.filter(item => item._id !== card.movieId);
        setSavedMovies(updatedSavedMovies);
        localStorage.removeItem('saved');
        localStorage.setItem('saved', JSON.stringify(updatedSavedMovies));
        if (filteredMovies.length > 0) {
          const updatedFilteredMovies = filteredMovies.filter(item => item._id !== card.movieId);
          setFilteredMovies(updatedFilteredMovies);
          localStorage.removeItem('filtered');
          localStorage.setItem('filtered', JSON.stringify(updatedFilteredMovies));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard(card) {
    const storedSaved = localStorage.getItem('saved');
    const parsedSaved = JSON.parse(storedSaved || '[]');
    const matchingCard = parsedSaved.find(item => item.nameRU === card.nameRU);
    mainApi.deleteMovie(matchingCard._id)
      .then(() => {
        const updatedSavedMovies = parsedSaved.filter(item => item._id !== matchingCard._id);
        localStorage.removeItem('saved');
        localStorage.setItem('saved', JSON.stringify(updatedSavedMovies));
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Routes>
            <Route path="/" element={
              <>
                <Header
                  loggedIn={isLoggedIn}
                />
                <Main />
                <Footer />
              </>
            } />
            <Route path="/signup" element={
              <Register
                onRegister={handleRegister}
                formValue={formValue}
                setFormValue={setFormValue}
              />
            } />
            <Route path="/signin" element={
              <Login
                onLogin={handleLogin}
                loginInfo={loginInfo}
                setLoginInfo={setLoginInfo}
              />
            } />
            <Route path="/movies" element={
              <ProtectedRouteElement isLoggedIn={isLoggedIn} element={
                <>
                  <Header
                    loggedIn={isLoggedIn}
                  />
                  <Movies
                    onSubmit={handleSearchSubmit}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    isSearched={isSearched}
                    windowWidth={windowWidth}
                    onSave={handleSavingCard}
                    onDeleteCard={handleDeleteCard}
                    setSavedMovies={setSavedMovies}
                    isFiltered={isFiltered}
                    setIsFiltered={setIsFiltered}
                    isChecked={isChecked}
                    keyword={keyword}
                  />
                  <Footer />
                </>
              } />
            } />
            <Route path="/saved-movies" element={
              <ProtectedRouteElement isLoggedIn={isLoggedIn} element={
                <>
                  <Header
                    loggedIn={isLoggedIn}
                  />
                  <SavedMovies
                    onDeleteCard={handleDeleteSavedCard}
                    setSavedMovies={setSavedMovies}
                    savedMovies={savedMovies}
                    filteredMovies={filteredMovies}
                    isFiltered={isFiltered}
                    setIsFiltered={setIsFiltered}
                    onSavedSearch={handleSavedSearch}
                    setFilteredMovies={setFilteredMovies}
                    isChecked={isChecked}
                  />
                  <Footer />
                </>
              } />
            } />
            <Route path="/profile" element={
              <ProtectedRouteElement isLoggedIn={isLoggedIn} element={
                <>
                  <Header
                    loggedIn={isLoggedIn}
                  />
                  <Profile
                    signOut={signOut}
                    onUpdate={updateUserInfo}
                    info={info}
                    setInfo={setInfo}
                  />
                </>
              } />
            } />
            <Route path="/*"
              element={
                <NotFound />
              } />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
