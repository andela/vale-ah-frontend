import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import SocialButton from '../SocialButton/SocialButton';

/**
 * Auth Component
 * @param {object} props
 * @returns {JSX.Element} Auth component
 */
const AuthHeader = ({ authType }) => {
  const [titleText, authTypeText] =
    authType === 'login' ? ['Welcome to', 'Sign in'] : ['Join', 'Sign up'];

  const SocialButtons = ['Facebook', 'Google', 'Twitter'].map(provider => (
    <SocialButton
      url={`${process.env.API_BASE_URL}/auth/login/${provider.toLowerCase()}`}
      key={provider}
      authType={authTypeText}
      provider={provider}
    />
  ));

  return (
    <header className="auth-header">
      <Header as="h2">{titleText} Naija ChopChop</Header>
      {SocialButtons}
    </header>
  );
};

AuthHeader.defaultProps = {
  authType: 'register',
};

AuthHeader.propTypes = {
  authType: PropTypes.string,
};

export default AuthHeader;
