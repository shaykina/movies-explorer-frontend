import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({allMovies}) {
  return (
    <section className="cards">
      {allMovies.map(data => {
                return (
                  <MoviesCard
                  nameRU={data.nameRU}
                  image={data.image}
                  ifSaved={data.ifSaved}
                  savedScreen={data.savedScreen}
                  />
                )
              })
            }
    </section>
  )
}

export default MoviesCardList;
