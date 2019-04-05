import React from 'react';
import PropTypes from 'prop-types';
/**
 * @function Social
 * @param {string} image
 * @param {string} link
 * @param {string} description
 *@returns { undefined }
 */
const SocialButton = ({ image, link, description, background }) => (
  <div className="socialContainer" style={{ backgroundColor: background }}>
    <a href={link}>
      <img src={image} alt="" className="social_image" />
      <p className="social_description">{description}</p>
    </a>
  </div>
);

SocialButton.propTypes = {
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};

export default SocialButton;
