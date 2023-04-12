import React from 'react';
import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header({ onSignOut, email }) {
  function handleSignOut() {
    onSignOut();
  }

  return (
    <header className='header'>
      <img src={logo} className='header__logo' alt='Around the U.S. logo' />
      <Route exact path='/'>
        <div className='header__wrapper'>
          <p className='header__user'>{email}</p>
          <button className='header__logout' onClick={handleSignOut}>
            Log out
          </button>
        </div>
      </Route>
      <Route path='/signup'>
        <Link className='header__auth-link' to='signin'>
          Log in
        </Link>
      </Route>
      <Route path='/signin'>
        <Link className='header__auth-link' to='signup'>
          Sign up
        </Link>
      </Route>
    </header>
  );
}

export default Header;
