import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Auth from '../Auth/Auth';
import { registerUser } from '../../actions/auth/auth-dispatchers';

/**
 * @description renders Register component
 * @param { object } props
 * @returns { JSX.Element } Register
 */
const Register = props => {
  const { onClose, success, isLoading, register } = props;
  if (success) {
    onClose();
    return <Redirect to="/recipes/create" />;
  }
  return (
    <div>
      <Auth
        authType="register"
        onClose={onClose}
        registerUser={register}
        isLoading={isLoading}
      />
    </div>
  );
};

Register.defaultProps = {
  isLoading: false,
  success: false,
};

Register.propTypes = {
  onClose: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  success: PropTypes.bool,
};

/**
 *
 * @param {*} state
 * @return {undefined}
 */
const mapStateToProps = state => ({
  ...state.auth,
});

export default connect(
  mapStateToProps,
  { register: registerUser }
)(withRouter(Register));
