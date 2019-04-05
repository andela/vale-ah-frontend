import React from 'react';
import Button from '../Button/Button';
import SocialButton from '../SocialButton/SocialButton';

/**
 * Renders a basic Login component
 * @returns {JSX} h2 element
 */
const Login = () => (
  <div className="login">
    <div className="close-button">
      <button type="button">×</button>
    </div>
    <form>
      <header>
        <h1 className="title">Welcome to Naija ChopChop</h1>
        <SocialButton authType="Sign in" provider="Facebook" />
        <SocialButton authType="Sign in" provider="Google" />
        <SocialButton authType="Sign in" provider="Twitter" />
      </header>
      <main>
        <fieldset>
          <legend>or</legend>
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
            Login
          </Button>
        </fieldset>
      </main>
    </form>
    <p className="other-auth">
      {`You don't have an account? `}
      <span className="action">Create account</span>
    </p>
  </div>
);

export default Login;
