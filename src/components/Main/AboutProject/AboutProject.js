import React from 'react';
import Heading from '../../Heading/Heading';

function AboutProject() {
  return (
    <section className="about-project">
      <Heading title="О проекте"/>
      <div className="about-project__text">
        <div className="about-project__column">
          <p className="about-project__first-paragraph">Дипломный проект включал 5 этапов</p>
          <p className="about-project__second-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__column">
          <p className="about-project__first-paragraph">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__second-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__grid">
        <div className="about-project__one-week">1&nbsp;неделя</div>
        <div className="about-project__four-weeks">4&nbsp;недели</div>
        <p className="about-project__grid-text">Back-end</p>
        <p className="about-project__grid-text">Front-end</p>
      </div>

    </section>
  )
}

export default AboutProject;
