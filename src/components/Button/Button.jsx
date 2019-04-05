import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {props} properties
 * @returns {JSX.Element} Button component
 */
const Button = ({ children, onClick, type, color = 'green' }) => {
  const buttonType = ['button', 'submit', 'reset'].includes(type)
    ? type
    : 'button';
  const colorClassName = color ? `button--${color}` : '';
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={`button ${colorClassName}`}
      type={buttonType}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  color: '',
  children: '',
  onClick: x => x,
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
