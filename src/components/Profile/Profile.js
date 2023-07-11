import React from "react";

function Profile() {
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__heading">Привет, Виталий!</h1>
        <ul className="profile__info">
          <li className="profile__item">
            <p className="profile__item-heading">Имя</p>
            <p className="profile__item-content">Виталий</p>
          </li>
          <li className="profile__item">
            <p className="profile__item-heading">E-mail</p>
            <p className="profile__item-content">pochta@yandex.ru</p>
          </li>
        </ul>
        <button className="profile__change" type="submit">Редактировать</button>
        <button className="profile__out" type="button">Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;
