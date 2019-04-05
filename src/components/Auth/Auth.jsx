import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import AuthHeader from './AuthHeader';

/**
 * Auth component
 * @param {object} props properties
 * @returns {JSX.Element} Auth component
 */
const Auth = ({ authType, onClose }) => {
  let submitButtonText;
  let otherAuthText;

  if (authType === 'login') {
    submitButtonText = 'Log in';
    otherAuthText = 'Create account';
  } else if (authType === 'register') {
    submitButtonText = 'Sign up';
    otherAuthText = 'Log in';
  }

  return (
    <div className="auth">
      <div className="close-button">
        <button type="button" onClick={onClose}>
          ×
        </button>
      </div>
      <form>
        <AuthHeader authType={authType} />
        <main>
          <fieldset>
            <legend>or</legend>
            {authType === 'register' && (
              <input
                className="text-field"
                type="text"
                name="username"
                placeholder="Username"
              />
            )}

            <input
              className="text-field"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="text-field"
              type="password"
              name="password"
              placeholder="Password"
            />
            <p className="forgot-password">Forgot password?</p>
            <Button type="submit" color="green">
              {submitButtonText}
            </Button>
          </fieldset>
        </main>
      </form>
      <p className="other-auth">
        {`You ${authType === 'login' ? "don't" : 'already'} have an account? `}
        <Link
          to={`/${authType === 'login' ? 'register' : 'login'}`}
          className="action"
        >
          {otherAuthText}
        </Link>
      </p>
    </div>
  );
};

Auth.propTypes = {
  authType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Auth;
