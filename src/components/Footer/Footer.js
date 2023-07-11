import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <nav className="footer__navigation">
          <a className="footer__link" href="https://practicum.yandex.ru" target="_blank">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/shaykina" target="_blank">Github</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
