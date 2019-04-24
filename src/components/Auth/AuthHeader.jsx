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
  const socialProviders = [
    {
      name: 'Facebook',
      url: `${process.env.API_BASE_URL}/auth/login/facebook`,
    },
    { name: 'Google', url: `${process.env.API_BASE_URL}/auth/login/google` },
    { name: 'Twitter', url: `${process.env.API_BASE_URL}/auth/login/twitter` },
  ];
  return (
    <header className="auth-header">
      <Header as="h2">{titleText} Naija ChopChop</Header>
      {socialProviders.map(provider => (
        <SocialButton
          url={provider.url}
          key={provider.name}
          authType={authTypeText}
          provider={provider.name}
        />
      ))}
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
