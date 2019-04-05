import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from '../Auth/Auth';

/**
 * Login Component
 */
class Login extends Component {
  /**
   * @constructor
   * @param {object} props properties
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Renders the login component
   * @returns {JSX.Element} Login element
   */
  render() {
    const { onClose } = this.props;
    return <Auth authType="login" onClose={onClose} />;
  }
}

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Login;
