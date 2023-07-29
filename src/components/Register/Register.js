import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register({ onRegister, formValue, setFormValue }) {

  const [nameError, setNameError] = React.useState('');
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

  const handleNameInput = (evt) => {
    validateInput(evt.target, setNameError);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const emailInputElement = evt.target.elements.email;
    const passwordInputElement = evt.target.elements.password;
    const nameInputElement = evt.target.elements.name;
    validateEmail(emailInputElement, setEmailError);
    validateInput(passwordInputElement, setPasswordError);
    validateInput(nameInputElement, setNameError);
    if (emailInputElement.validity.valid && passwordInputElement.validity.valid && nameInputElement.validity.valid) {
      onRegister();
    }
    setIsFormValid(emailInputElement.validity.valid && passwordInputElement.validity.valid && nameInputElement.validity.valid);
    formRef.current = evt.target;
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link className="register__image-link" to="/">
          <img className="register__logo" src={logo} alt="логотип" />
        </Link>
        <h1 className="register__heading">Добро пожаловать!</h1>
        <form className="register__form" name="register" onSubmit={handleSubmit}>
          <fieldset className="register__fieldset">
            <label className="register__field">
              <h2 className="register__input-heading">Имя</h2>
              <input className={`register__input ${nameError ? "register__input_error" : ""}`} type="text" name="name" id="name" placeholder="Виталий" onInput={handleNameInput} onChange={handleChange}
                minLength="2" maxLength="40" required />
              <span className={`register__error name__error ${nameError ? "register__error_visible" : ""}`}>{nameError}</span>
            </label>
            <label className="register__field">
              <h2 className="register__input-heading">E-mail</h2>
              <input className={`register__input ${emailError ? "register__input_error" : ""}`} type="email" name="email" id="email" placeholder="pochta@yandex.ru" onInput={handleEmailInput} onChange={handleChange}
                minLength="2" maxLength="40" required />
              <span className={`register__error email__error ${emailError ? "register__error_visible" : ""}`}>{emailError}</span>
            </label>
            <label className="register__field">
              <h2 className="register__input-heading">Пароль</h2>
              <input className={`register__input ${passwordError ? "register__input_error" : ""}`} type="password" name="password" id="password" placeholder="Пароль" onInput={handlePasswordInput} onChange={handleChange}
                minLength="2" maxLength="40" required />
              <span className={`register__error password__error ${passwordError ? "register__error_visible" : ""}`}>{passwordError}</span>
            </label>
          </fieldset>
          <button className="register__submit" type="submit" disabled={emailError || passwordError || nameError}>Зарегистрироваться</button>
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
