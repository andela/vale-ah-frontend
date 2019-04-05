import React from 'react';
import PropTypes from 'prop-types';
import SocialButton from '../SocialButton/SocialButton';

/**
 * Auth Component
 * @param {object} props
 * @returns {JSX.Element} Auth component
 */
const AuthHeader = ({ authType }) => {
  const [titleText, authTypeText] =
    authType === 'login' ? ['Welcome to', 'Sign in'] : ['Join', 'Sign up'];
  return (
    <header>
      <h1 className="title">{titleText} Naija ChopChop</h1>
      <SocialButton authType={authTypeText} provider="Facebook" />
      <SocialButton authType={authTypeText} provider="Google" />
      <SocialButton authType={authTypeText} provider="Twitter" />
    </header>
  );
};

AuthHeader.propTypes = {
  authType: PropTypes.string.isRequired,
};

export default AuthHeader;
