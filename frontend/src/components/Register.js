import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = { email, password };
    onRegister(userData);
  }

  return (
    <div className='auth-form'>
      <h2 className='auth-form__title'>Sign up</h2>
      <form onSubmit={handleSubmit} className='auth-form__form'>
        <input
          id='email'
          name='name'
          value={email}
          type='text'
          className='auth-form__input'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id='password'
          name='password'
          value={password}
          type='password'
          className='auth-form__input'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className='auth-form__footer'>
          <div className='auth-form__footer-wrapper'>
            <button type='submit' className='auth-form__submit-button'>
              Sign up
            </button>
            <p className='auth-form__footer-text'>
              Already a member?{" "}
              <Link className='auth-form__footer-link' to='/signin'>
                Log in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
