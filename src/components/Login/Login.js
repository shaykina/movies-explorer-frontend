import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login({ onLogin, loginInfo, setLoginInfo }) {

  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const formRef = React.useRef();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  React.useEffect(() => {
    if (isFormValid && formRef.current) {
      setIsFormValid(false);
    }
  }, [isFormValid]);

  function validateInput(inputElement, setError) {
    if (!inputElement.validity.valid) {
      setError(inputElement.validationMessage);
    } else {
      setError("");
    }
  }

  const validateEmail = (inputElement, setError) => {
    if (!emailRegex.test(inputElement.value)) {
      setError("Неверный формат email");
    } else {
      setError("");
    }
  }

  const handleEmailInput = (evt) => {
    validateEmail(evt.target, setEmailError);
  }

  const handlePasswordInput = (evt) => {
    validateInput(evt.target, setPasswordError);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const emailInputElement = evt.target.elements.email;
    const passwordInputElement = evt.target.elements.password;
    validateEmail(emailInputElement, setEmailError);
    validateInput(passwordInputElement, setPasswordError);
    if (emailInputElement.validity.valid && passwordInputElement.validity.valid) {
      onLogin();
    }
    setIsFormValid(emailInputElement.validity.valid && passwordInputElement.validity.valid);
    formRef.current = evt.target;
  }

  return (
    <section className="login">
      <div className="login__container">
        <Link className="login__image-link" to="/">
          <img className="login__logo" src={logo} alt="логотип" />
        </Link>
        <h1 className="login__heading">Рады видеть!</h1>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <fieldset className="login__fieldset">
            <h2 className="login__input-heading">E-mail</h2>
            <label className="login__field">
              <input className={`login__input ${emailError ? "login__input_error" : ""}`} type="email" name="email" id="email" placeholder="pochta@yandex.ru" onInput={handleEmailInput} onChange={handleChange}
                minLength="2" maxLength="40" required />
              <span className={`login__error email__error ${emailError ? "login__error_visible" : ""}`}>{emailError}</span>
            </label>
            <h2 className="login__input-heading">Пароль</h2>
            <label className="login__field">
              <input className={`login__input ${passwordError ? "login__input_error" : ""}`} type="password" name="password" id="password" placeholder="Пароль" onInput={handlePasswordInput} onChange={handleChange}
                minLength="2" maxLength="40" required />
              <span className={`login__error password__error ${passwordError ? "login__error_visible" : ""}`}>{passwordError}</span>
            </label>
          </fieldset>
          <button className="login__submit" type="submit" disabled={emailError || passwordError}>Войти</button>
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
