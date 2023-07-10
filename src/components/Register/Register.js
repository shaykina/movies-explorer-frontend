import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {

  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleEmailInput = (event) => {
    setEmailError(event.target.validationMessage);
  }

  const handlePasswordInput = (event) => {
    setPasswordError(event.target.validationMessage);
  }

  const handleNameInput = (event) => {
    setNameError(event.target.validationMessage);
  }

  return (
    <section className="register">
      <div className="register__container">
        <img className="register__logo" src={logo} alt="логотип" />
        <h1 className="register__heading">Добро пожаловать!</h1>
        <form className="register__form" name="register">
          <fieldset className="register__fieldset">
            <label className="register__field">
              <h2 className="register__input-heading">Имя</h2>
              <input className={`register__input ${nameError ? "register__input_error" : ""}`} type="text" name="name" id="name" placeholder="Виталий" onInput={handleNameInput}
                minLength="2" maxLength="40" required />
              <span className={`register__error name__error ${nameError ? "register__error_visible" : ""}`}>{nameError}</span>
            </label>
            <label className="register__field">
              <h2 className="register__input-heading">E-mail</h2>
              <input className={`register__input ${emailError ? "register__input_error" : ""}`} type="email" name="email" id="email" placeholder="pochta@yandex.ru" onInput={handleEmailInput}
                minLength="2" maxLength="40" required />
              <span className={`register__error email__error ${emailError ? "register__error_visible" : ""}`}>{emailError}</span>
            </label>
            <label className="register__field">
              <h2 className="register__input-heading">Пароль</h2>
              <input className={`register__input ${passwordError ? "register__input_error" : ""}`} type="password" name="password" id="password" placeholder="Пароль" onInput={handlePasswordInput}
                minLength="2" maxLength="40" required />
              <span className={`register__error password__error ${passwordError ? "register__error_visible" : ""}`}>{passwordError}</span>
            </label>
          </fieldset>
          <button className="register__submit" type="submit">Зарегистрироваться</button>
        </form>
        <div className="register__registered">
          <p className="register__text">Уже зарегистрированы?</p>
          <Link className="register__link" to={"/signin"}>Войти</Link>
        </div>
      </div>
    </section>
  )
}

export default Register;
