import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {props} properties
 * @returns {JSX.Element} Social button component
 */
const SocialButton = ({ authType, provider }) => {
  return (
    <button
      type="button"
      className={`social-button button--${provider.toLowerCase()}`}
    >
      <span className="logo" style={{ color: '#ffffff' }}>
        <i className={`fa fa-${provider.toLowerCase()}`} />
      </span>
      <span className="text">
        {authType} with {provider}
      </span>
    </button>
  );
};

SocialButton.propTypes = {
  authType: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
};

export default SocialButton;
