import React from 'react';
import PropTypes from 'prop-types';
/**
 * @function Social
 * @param {string} image
 * @param {string} link
 * @param {string} description
 *@returns { undefined }
 */
const Button = ({ title, onClick }) => (
  <button type="submit" className="auth_btn" onClick={onClick}>
    {title}
  </button>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
