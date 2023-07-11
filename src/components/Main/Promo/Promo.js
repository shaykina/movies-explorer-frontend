import React from 'react';
import picture from '../../../images/landing-image.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="promo__image-container">
        <img className="promo__image" src={picture} alt="абстрактный узор" />
      </div>
    </section>
  )
}

export default Promo;
