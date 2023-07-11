import React from 'react';
import Heading from '../../Heading/Heading.js';
import photo from '../../../images/student-photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <Heading title="Студент" />
      <div className="about-me__info">
        <div className="about-me__text">
          <h3 className="about-me__name">Виталий</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href="https://github.com/shaykina" target="_blank" className="about-me__github">Github</a>
        </div>
        <img className="about-me__photo" src={photo} alt="портрет студента" />
      </div>
    </section>
  )
}

export default AboutMe;
