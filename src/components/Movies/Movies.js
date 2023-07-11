import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import card1 from '../../images/card1.jpg';
import card2 from '../../images/card2.jpg';
import card3 from '../../images/card3.jpg';
import card4 from '../../images/card4.jpg';
import card5 from '../../images/card5.jpg';
import card6 from '../../images/card6.jpg';
import card7 from '../../images/card7.jpg';
import card8 from '../../images/card8.jpg';
import card9 from '../../images/card9.jpg';
import card10 from '../../images/card10.jpg';
import card11 from '../../images/card11.jpg';
import card12 from '../../images/card12.jpg';

const allMovies = [
  {
    nameRU: '33 слова о дизайне',
    image: card1 ,
    ifSaved: false,
  },
  {
    nameRU: 'Киноальманах «100 лет дизайна»',
    image: card2 ,
    ifSaved: true,
  },
  {
    nameRU: 'В погоне за Бенкси',
    image: card3 ,
    ifSaved: false,
  },
  {
    nameRU: 'Баския: Взрыв реальности',
    image: card4 ,
    ifSaved: false,
  },
  {
    nameRU: 'Бег это свобода',
    image: card5 ,
    ifSaved: false,
  },
  {
    nameRU: 'Книготорговцы',
    image: card6 ,
    ifSaved: true,
  },
  {
    nameRU: 'Когда я думаю о Германии ночью',
    image: card7 ,
    ifSaved: false,
  },
  {
    nameRU: 'Gimme Danger: История Игги и The Stooges',
    image: card8 ,
    ifSaved: false,
  },
  {
    nameRU: 'Дженис: Маленькая девочка грустит',
    image: card9 ,
    ifSaved: false,
  },
  {
    nameRU: 'Соберись перед прыжком',
    image: card10 ,
    ifSaved: false,
  },
  {
    nameRU: 'Пи Джей Харви: A dog called money',
    image: card11 ,
    ifSaved: false,
  },
  {
    nameRU: 'По волнам: Искусство звука в кино',
    image: card12 ,
    ifSaved: false,
  }
]


function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        allMovies={allMovies}
      />
      <button className="movies__button" type="button">Ещё</button>
    </main>
  )
}

export default Movies;
