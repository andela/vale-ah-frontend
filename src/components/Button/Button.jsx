import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {props} properties
 * @returns {JSX.Element} Button component
 */
const Button = ({ children, type, color = 'green' }) => {
  const buttonType = ['button', 'submit', 'reset'].some(value => value === type)
    ? type
    : 'button';
  const colorClassName = color ? `button--${color}` : '';
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`button ${colorClassName}`} type={buttonType}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  color: '',
  children: '',
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
};

export default Button;
