import React from 'react';
import picture from '../../../images/landing-image.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__image" src={picture} alt="абстрактный узор"/>
    </section>
  )
}

export default Promo;
