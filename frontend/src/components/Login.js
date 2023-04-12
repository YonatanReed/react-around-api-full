import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = { email, password };
    onLogin(userData);
  }

  return (
    <div className='auth-form'>
      <h2 className='auth-form__title'>Log in</h2>
      <form onSubmit={handleSubmit} className='auth-form__form'>
        <input
          id='Email'
          name='name'
          value={email}
          type='text'
          className='auth-form__input'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          required
          id='password'
          name='password'
          value={password}
          type='password'
          className='auth-form__input'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className='auth-form__footer'>
          <div className='auth-form__footer-wrapper'>
            <button type='submit' className='auth-form__submit-button'>
              Log in
            </button>
            <p className='auth-form__footer-text'>
              Not a member yet?{" "}
              <Link className='auth-form__footer-link' to='/signup'>
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
