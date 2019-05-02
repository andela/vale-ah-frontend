import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';

/**
 * @param {props} properties
 * @returns {JSX.Element} Social button component
 */
const SocialButton = ({ authType, provider, url }) => (
  <div className="social">
    <Button
      type="button"
      className={`social-button link button--${provider.toLowerCase()}`}
    >
      <a href={url} className="link">
        <Icon name={provider.toLowerCase()} />
        <span className="text">
          {authType} with {provider}
        </span>
      </a>
    </Button>
  </div>
);

SocialButton.propTypes = {
  authType: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SocialButton;
