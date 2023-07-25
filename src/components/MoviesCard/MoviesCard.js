import React from 'react';
import { useLocation } from 'react-router-dom';
const savedMovies = JSON.parse(localStorage.getItem('saved') || '[]');

function MoviesCard({ nameRU, imageUrl, duration, trailerLink, onSave, country, director, year, description, thumbnail, nameEN, movieId, onDeleteCard, setSavedMovies, setFilteredMovies }) {

  const card = { nameRU, imageUrl, duration, trailerLink, country, director, year, description, thumbnail, nameEN, movieId };
  const [isSaved, setIsSaved] = React.useState(savedMovies.some(card => card.nameRU === nameRU));
  const location = useLocation().pathname;

  React.useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('saved') || '[]');
    setIsSaved(savedMovies.some(card => card.nameRU === nameRU));
  }, [location]);

  function handleCardClick() {
    window.open(trailerLink, '_blank');
  }

  function handleSaveClick(event) {
    event.stopPropagation();
    onSave(card);
    setIsSaved(true);
  }

  function handleDeleteClick(event) {
    event.stopPropagation();
    onDeleteCard(card);
    setSavedMovies(prevMovies => {
      const newSavedMovies = prevMovies.filter(movie => movie.movieId !== card.movieId);
      localStorage.setItem('saved', JSON.stringify(newSavedMovies));
      return newSavedMovies;
    });
    if (location === '/saved-movies' && setFilteredMovies.lenghth > 0) {
      setFilteredMovies(prevMovies => {
        const newFilteredMovies = prevMovies.filter(movie => movie._id !== card._id);
        localStorage.setItem('filtered', JSON.stringify(newFilteredMovies));
        return newFilteredMovies;
      });
    }
    setIsSaved(false);
  }

  return (
    <article className="card" onClick={handleCardClick}>
      <img className="card__image" alt={nameRU} src={imageUrl}></img>
      <div className="card__info">
        <h2 className="card__title">{nameRU}</h2>
        <div className="card__duration">{`${Math.floor(duration / 60)}ч ${duration % 60}м`}</div>
      </div>
      <button className="card__save" type="button" onClick={handleSaveClick} style={{ visibility: (isSaved || location === '/saved-movies') && 'hidden' }}>Сохранить</button>
      <button className="card__saved" type="button" onClick={handleDeleteClick} style={{ visibility: isSaved ? 'visible' : 'hidden' }}></button>
      <button className="card__delete" type="button" onClick={handleDeleteClick} style={{ visibility: location === '/saved-movies' ? 'visible' : 'hidden' }}></button>
    </article>
  )
}

export default MoviesCard;
