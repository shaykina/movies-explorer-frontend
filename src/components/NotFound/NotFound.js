import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="notfound">
      <h1 className="notfound__error-number">404</h1>
      <h2 className="notfound__error-text">Страница не найдена</h2>
      <Link className="notfound__link" to={"/"}>Назад</Link>
    </section>
  )
}

export default NotFound;
