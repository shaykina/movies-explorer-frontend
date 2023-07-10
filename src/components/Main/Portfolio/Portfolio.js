import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/shaykina/how-to-learn">Статичный сайт</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/shaykina/russian-travel">Адаптивный сайт</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link portfolio__link_last" href="https://github.com/shaykina/react-mesto-api-full-gha">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
