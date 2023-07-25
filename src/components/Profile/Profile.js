import React from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ signOut, onUpdate, info, setInfo }) {

  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isEditActive, setIsEditActive] = React.useState(false);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);
  const formRef = React.useRef();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    info.name = currentUser.name;
    info.email = currentUser.email;
  }, [currentUser]);

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

  const handleEmailInput = (evt) => {
    validateInput(evt.target, setEmailError);
    if (evt.target.value !== currentUser.name) {
      setIsSubmitButtonActive(true);
    } else {
      setIsSubmitButtonActive(false);
    }
  }

  const handleNameInput = (evt) => {
    validateInput(evt.target, setNameError);
    if (evt.target.value !== currentUser.name) {
      setIsSubmitButtonActive(true);
    } else {
      setIsSubmitButtonActive(false);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setInfo({
      ...info,
      [name]: value
    });
  }

  function editProfile() {
    setIsSubmitButtonActive(false);
    setIsEditActive(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const emailInputElement = evt.target.elements.email;
    const nameInputElement = evt.target.elements.name;
    validateInput(emailInputElement, setEmailError);
    validateInput(nameInputElement, setNameError);
    if (emailInputElement.validity.valid && nameInputElement.validity.valid) {
      onUpdate();
    }
    setIsFormValid(emailInputElement.validity.valid && nameInputElement.validity.valid);
    formRef.current = evt.target;
    setIsEditActive(false);
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
        <form className="profile__info" name="profile" onSubmit={isEditActive ? handleSubmit : editProfile} noValidate>
          <div className="profile__item">
            <label className="profile__item-heading">Имя</label>
            {
              isEditActive ?
                <input className={`profile__item-content ${nameError ? "profile__item-content_error" : ""}`} type="text" name="name" id="name" value={info.name || ''} onInput={handleNameInput} onChange={handleChange} minLength="2" maxLength="40" required /> :
                <p className="profile__item-content">{currentUser.name}</p>
            }
          </div>
          <span className={`profile__error name__error ${nameError ? "profile__error_visible" : ""}`}>{nameError}</span>
          <div className="profile__item">
            <label className="profile__item-heading">E-mail</label>
            {
              isEditActive ?
                <input className={`profile__item-content ${emailError ? "profile__item-content_error" : ""}`} type="email" name="email" id="email" value={info.email || ''} onInput={handleEmailInput} onChange={handleChange} minLength="2" maxLength="40" required /> :
                <p className="profile__item-content">{currentUser.email}</p>
            }
          </div>
          <span className={`profile__error email__error ${emailError ? "profile__error_visible" : ""}`}>{emailError}</span>
          {isEditActive && <button className="profile__change" disabled={!isSubmitButtonActive || nameError || emailError} type="submit">Сохранить</button>}
        </form>
        {!isEditActive && <button className="profile__change" type="button" onClick={editProfile}>Редактировать</button>}
        <Link className="profile__out" type="button" onClick={signOut} to="/">Выйти из аккаунта</Link>
      </div>
    </section>
  )
}

export default Profile;
