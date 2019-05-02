/* eslint-disable consistent-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AuthHeader from './AuthHeader';
import TextInput from '../TextInput/TextInput';
import {
  loginUser,
  registerUser,
  socialLogin,
  checkAuth,
} from '../../actions/auth/auth-dispatchers';

/**
 * Auth component
 * @returns {JSX.Element} Auth component
 */
export class AuthComponent extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    social: PropTypes.func.isRequired,
    location: PropTypes.shape({}).isRequired,
    auth: PropTypes.shape({
      errors: PropTypes.shape({
        username: PropTypes.array,
        email: PropTypes.array,
        password: PropTypes.array,
      }),
      isLoading: PropTypes.bool,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        authType: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    user: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  };

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    const { history, location, social } = this.props;
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    if (token !== null) {
      social(token, history);
    }
    checkAuth();
  }

  /**
   * @param {*} e - event
   * @returns {object} - Changed state
   */
  handleInputChange = e => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value,
      },
    });
  };

  /**
   * @param {Event} e
   * @returns {undefined}
   */
  handleSubmit = e => {
    e.preventDefault();
    const {
      match: {
        params: { authType },
      },
      login,
      register,
    } = this.props;
    const { user } = this.state;
    return authType === 'register' ? register(user) : login(user);
  };

  /**
   * @param {string} field Field
   * @returns {Boolean} exists?
   */
  errorExists = field => {
    const {
      auth: { errors },
    } = this.props;
    return !!errors[field];
  };

  /**
   * @param {string} authType
   * @returns {object} texts based on authentication type
   */
  authTexts = authType => {
    return authType === 'login'
      ? {
          submitButtonText: 'Log in',
          altLinkText: 'Create account',
          altAuthText: "don't",
          altLinkTo: '/register',
        }
      : {
          submitButtonText: 'Sign up',
          altLinkText: 'Log in',
          altAuthText: 'already',
          altLinkTo: '/login',
        };
  };

  /**
   * renders the component
   * @returns {JSX.Element} Auth Component
   * @memberof Auth
   */
  render() {
    const {
      match: {
        params: { authType },
      },
      auth: { errors, isLoading },
    } = this.props;

    const {
      submitButtonText,
      altAuthText,
      altLinkText,
      altLinkTo,
    } = this.authTexts(authType);
    const fields = [
      { placeholder: 'Username', name: 'username', type: 'text' },
      { placeholder: 'Email', name: 'email', type: 'email' },
      { placeholder: 'Password', name: 'password', type: 'password' },
      {
        placeholder: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
      },
    ];
    const { user } = this.state;
    return (
      <div className="auth">
        <form onSubmit={this.handleSubmit} id="authForm">
          <AuthHeader authType={authType} />
          <section>
            <fieldset>
              <legend>or</legend>
              {fields.map(field => {
                if (
                  authType === 'login' &&
                  (field.name === 'username' ||
                    field.name === 'confirmPassword')
                )
                  return;
                return (
                  <TextInput
                    key={field.name}
                    placeholder={field.placeholder}
                    name={field.name}
                    type={field.type}
                    onChange={this.handleInputChange}
                    value={user[field.name]}
                    errors={errors}
                    errorExists={this.errorExists}
                    required
                  />
                );
              })}

              {authType === 'login' && (
                <p className="forgot-password">Forgot password?</p>
              )}
              <Button
                type="submit"
                className="button--green"
                disabled={isLoading}
                loading={isLoading}
              >
                {submitButtonText}
              </Button>
            </fieldset>
          </section>
        </form>
        <p className="other-auth">
          {`You ${altAuthText} have an account? `}
          <Link to={altLinkTo} className="action">
            {altLinkText}
          </Link>
        </p>
      </div>
    );
  }
}

/**
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = state => ({ auth: state.auth });

export const RoutedAuth = withRouter(AuthComponent);

const Auth = connect(
  mapStateToProps,
  {
    login: loginUser,
    register: registerUser,
    social: socialLogin,
    getCurrentUser: checkAuth,
  }
)(RoutedAuth);

export default Auth;
