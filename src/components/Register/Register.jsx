import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from '../Auth/Auth';

/**
 * Register Component
 */
class Register extends Component {
  /**
   * @constructor
   * @param {object} props properties
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Renders the Register component
   * @returns {JSX.Element} Register element
   */
  render() {
    const { onClose } = this.props;
    return <Auth authType="register" onClose={onClose} />;
  }
}

Register.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Register;
