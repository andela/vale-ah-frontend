import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {object} props
 * @return { JSX.Element } TextInput
 */
const TextInput = props => {
  const {
    onChange,
    errorExists,
    name,
    type,
    placeholder,
    required,
    value,
    errors,
  } = props;
  return (
    <Fragment>
      <input
        className="text-field"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
      <ul className="error">
        {errorExists(name) &&
          errors[name].map(errMsg => <li key={errMsg}>{errMsg}</li>)}
      </ul>
    </Fragment>
  );
};

TextInput.defaultProps = {
  required: false,
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorExists: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    username: PropTypes.array,
    email: PropTypes.array,
    password: PropTypes.array,
  }).isRequired,
  required: PropTypes.bool,
};

export default TextInput;
