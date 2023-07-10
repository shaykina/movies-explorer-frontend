import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {

  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleEmailInput = (event) => {
    setEmailError(event.target.validationMessage);
  }

  const handlePasswordInput = (event) => {
    setPasswordError(event.target.validationMessage);
  }

  return (
    <section className="login">
      <div className="login__container">
        <img className="login__logo" src={logo} alt="логотип" />
        <h1 className="login__heading">Рады видеть!</h1>
        <form className="login__form" name="login">
          <fieldset className="login__fieldset">
          <h2 className="login__input-heading">E-mail</h2>
            <label className="login__field">
              <input className={`login__input ${emailError ? "login__input_error" : ""}`} type="email" name="email" id="email" placeholder="pochta@yandex.ru" onInput={handleEmailInput}
                minLength="2" maxLength="40" required />
              <span className={`login__error email__error ${emailError ? "login__error_visible" : ""}`}>{emailError}</span>
            </label>
            <h2 className="login__input-heading">Пароль</h2>
            <label className="login__field">
              <input className={`login__input ${passwordError ? "login__input_error" : ""}`} type="password" name="password" id="password" placeholder="Пароль" onInput={handlePasswordInput}
                minLength="2" maxLength="40" required />
              <span className={`login__error password__error ${passwordError ? "login__error_visible" : ""}`}>{passwordError}</span>
            </label>
          </fieldset>
          <button className="login__submit" type="submit">Войти</button>
        </form>
        <div className="login__logined">
          <p className="login__text">Ещё не зарегистрированы?</p>
          <Link className="login__link" to={"/signup"}>Регистрация</Link>
        </div>
      </div>
    </section>
  )
}

export default Login;
