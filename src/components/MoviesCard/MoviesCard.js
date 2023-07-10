import React from 'react';

function MoviesCard({ nameRU, image, duration, ifSaved, savedScreen }) {
  return (
    <article className="card">
      <img className="card__image" alt={nameRU} src={image}></img>
      <div className="card__info">
        <h2 className="card__title">{nameRU}</h2>
        <div className="card__duration">{duration || '1ч 17м'}</div>
      </div>
      <button className="card__save" type="button" style={{ visibility: (ifSaved || savedScreen) && 'hidden' }}>Сохранить</button>
      <div className="card__saved" style={{ visibility: ifSaved ? 'visible' : 'hidden' }}></div>
    </article>
  )
}

export default MoviesCard;
