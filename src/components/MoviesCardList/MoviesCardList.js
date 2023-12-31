import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { MOVIES_URL } from '../../utils/MoviesApi.js';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ windowWidth, onSave, onDeleteCard, setSavedMovies, savedMovies, filteredMovies, isFiltered, setIsFiltered, setFilteredMovies, movies, setMovies }) {

  const [cardsNumber, setCardsNumber] = React.useState();
  const [additionalCardsNumber, setAdditionalCardsNumber] = React.useState();
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);

  const location = useLocation().pathname;

  function renderCardsNumber() {
    if (windowWidth >= 1280) {
      setCardsNumber(12);
      setAdditionalCardsNumber(3);
    } else if (windowWidth >= 768) {
      setCardsNumber(8);
      setAdditionalCardsNumber(2);
    } else if (windowWidth >= 320) {
      setCardsNumber(5);
      setAdditionalCardsNumber(2);
    }
  }

  function handleCardsClick() {
    const prevCardsNumber = cardsNumber;
    const additionalMovies = movies.slice(prevCardsNumber, prevCardsNumber + additionalCardsNumber);
    setInitialMovies((prevMovies) => [...prevMovies, ...additionalMovies]);
    if (cardsNumber <= movies.length) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    setCardsNumber(prevCardsNumber + additionalCardsNumber);
  }

  React.useEffect(() => {
    renderCardsNumber();
  }, [windowWidth]);

  React.useEffect(() => {
    if (movies) {
      setInitialMovies(movies.slice(0, cardsNumber));
      if (cardsNumber <= movies.length) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [cardsNumber, movies]);

  React.useEffect(() => {
    const storedSaved = localStorage.getItem('saved');
    const parsedSaved = JSON.parse(storedSaved || '[]');
    setSavedMovies(parsedSaved);
    setIsFiltered(false);
    if (movies) {
      setMovies(movies);
    }
  }, []);

  return (
    <section className="cards">
      <div className="cards__container">
        {(location === '/movies') && initialMovies.map(data => {
          return (
            <MoviesCard
              key={data.id}
              nameRU={data.nameRU}
              imageUrl={`${MOVIES_URL}${data.image.url}`}
              duration={data.duration}
              trailerLink={data.trailerLink}
              onSave={onSave}
              country={data.country}
              director={data.director}
              year={data.year}
              description={data.description}
              thumbnail={data.thumbnail}
              nameEN={data.nameEN}
              movieId={data.id}
              onDeleteCard={onDeleteCard}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
            />
          )
        })}
        {((location === '/saved-movies') && (!isFiltered)) && savedMovies.map(data => {
          return (
            <MoviesCard
              key={data._id}
              nameRU={data.nameRU}
              imageUrl={data.image}
              duration={data.duration}
              trailerLink={data.trailerLink}
              onSave={onSave}
              country={data.country}
              director={data.director}
              year={data.year}
              description={data.description}
              thumbnail={data.thumbnail}
              nameEN={data.nameEN}
              movieId={data._id}
              onDeleteCard={onDeleteCard}
              setSavedMovies={setSavedMovies}
              setFilteredMovies={setFilteredMovies}
              savedMovies={savedMovies}
            />
          )
        })}
        {((location === '/saved-movies') && (isFiltered)) && filteredMovies.map(data => {
          return (
            <MoviesCard
              key={data._id}
              nameRU={data.nameRU}
              imageUrl={data.image}
              duration={data.duration}
              trailerLink={data.trailerLink}
              onSave={onSave}
              country={data.country}
              director={data.director}
              year={data.year}
              description={data.description}
              thumbnail={data.thumbnail}
              nameEN={data.nameEN}
              movieId={data._id}
              onDeleteCard={onDeleteCard}
              setSavedMovies={setSavedMovies}
              setFilteredMovies={setFilteredMovies}
              savedMovies={savedMovies}
            />
          )
        })}
      </div>
      {isActive && <button className="cards__button" type="button" onClick={handleCardsClick}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
