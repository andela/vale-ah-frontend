import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { changePassword } from '../../actions/auth/password-reset';

/**
 *
 *
 * @class PasswordReset
 * @extends {Component}
 */
class PasswordReset extends Component {
  /**
   *Creates an instance of PasswordReset.
   * @param {*} props
   * @memberof PasswordReset
   */
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      errors: {},
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   *
   *
   * @returns
   * @memberof PasswordReset
   * @returns {undefined}
   */
  componentDidMount() {
    const {
      history,
      history: {
        location: { search },
      },
    } = this.props;

    const token = search.split('=')[1];
    localStorage.setItem('authorization', token);

    const decoded = jwtDecode(token);

    if (!decoded) {
      localStorage.removeItem(token);
      history.push('/password/reset');
    }
  }

  /**
   *
   *
   * @param {*} e
   * @memberof PasswordReset
   * @returns {undefined}
   */
  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @returns
   * @memberof PasswordReset
   * @returns {undefined}
   */
  handleValidation() {
    const { password, confirmPassword } = this.state;
    const errors = {};
    let formIsValid = true;
    if (!password) {
      formIsValid = false;
      errors.password = 'Password field cannot be empty';
    } else if (password !== confirmPassword) {
      formIsValid = false;
      errors.confirmPassword = 'Password doesn"t match';
    }

    this.setState({ errors });
    return formIsValid;
  }

  /**
   *
   *
   * @param {*} e
   * @memberof PasswordReset
   * @returns {undefined}
   */
  handleSubmit(e) {
    e.preventDefault();
    const { password } = this.state;
    const { resetPassword } = this.props;

    if (this.handleValidation()) {
      resetPassword(password, localStorage.authorization);
    }
  }

  /**
   *
   *
   * @returns  {JSX} - Jsx
   * @memberof PasswordReset
   */
  render() {
    const { password, confirmPassword } = this.state;
    const { errors } = this.state;
    const {
      passwordChange: { isChanging, success, response },
      history,
    } = this.props;

    if (success) {
      toast.success(response.message);
      history.push('/login');
    }

    return (
      <section className="container">
        <div className="form-container">
          <p className="change-password-desc">Change your password</p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <input
                placeholder="Password"
                id="password"
                name="password"
                type="text"
                onChange={this.onChangeHandler}
                value={password}
                className="password-reset-field"
              />
              {errors.password && (
                <small className="err-msg">{errors.password}</small>
              )}
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="Confirm password"
                id="confirm-password"
                name="confirmPassword"
                onChange={this.onChangeHandler}
                value={confirmPassword}
                className="password-reset-field"
              />
              {errors.confirmPassword && (
                <small className="err-msg">{errors.confirmPassword}</small>
              )}
            </Form.Field>
            <Button type="submit" className="reset-btn">
              {!isChanging ? 'Change Password' : <span className="spinner" />}
            </Button>
          </Form>
        </div>
      </section>
    );
  }
}

PasswordReset.propTypes = {
  history: PropTypes.shape().isRequired,
  resetPassword: PropTypes.func.isRequired,
  passwordChange: PropTypes.func.isRequired,
};

/**
 *
 * @param {state} state
 * @returns
 * @returns {state} Redux state
 */
const mapStateToProps = state => ({
  passwordChange: state.changePassword,
});

export default connect(
  mapStateToProps,
  { resetPassword: changePassword }
)(PasswordReset);
