import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';
import { handleMessages } from '../../utils/helpers';

/**
 * @param {object} props
 * @returns {JSX.Element} Login component
 */
const Login = props => {
  const { onClose, success, isLoading } = props;
  if (success) {
    handleMessages(['Login Successful'], 'success');
    onClose();
    return <Redirect to="/recipes/create" />;
  }

  return <Auth authType="login" onClose={onClose} isLoading={isLoading} />;
};

Login.defaultProps = {
  isLoading: false,
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  success: PropTypes.bool.isRequired,
};

/**
 *
 * @param {*} state
 * @return {undefined}
 */
const mapStateToProps = state => ({
  ...state.auth,
});

export default connect(mapStateToProps)(Login);
