import React, { Component } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';
import { isEmail } from 'validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Lock from '../../../public/assets/lock.svg';
import { sendResetLink } from '../../actions/auth/password-reset-link';

/**
 *
 *
 * @class PasswordReset
 * @extends {Component}
 */
class PasswordResetLink extends Component {
  /**
   *Creates an instance of PasswordReset.
   * @param {*} props
   * @memberof PasswordReset
   */
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  /**
   *
   *
   * @param {field} target
   * @memberof PasswordReset
   * @returns {undefined}
   */
  onFocusClear() {
    const { passwordError } = this.props;
    delete passwordError[0];
  }

  /**
   *
   *
   * @returns
   * @memberof PasswordReset
   * @returns {undefined}
   */
  handleValidation() {
    const { email } = this.state;
    const errors = {};
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      errors.email = 'E-mail field cannot be empty';
    } else if (!isEmail(email)) {
      formIsValid = false;
      errors.email = 'E-mail is invalid';
    }

    this.setState({ errors });

    return formIsValid;
  }

  /**
   *
   *
   * @param {*} e
   * @param {*} { name, value }
   * @memberof PasswordReset
   * @returns {undefined}
   */
  handleChange(e) {
    this.setState({ email: e.target.value }, () => {
      this.handleValidation();
    });
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
    const { email } = this.state;
    const {
      passwordReset: { success },
    } = this.props;
    // eslint-disable-next-line no-shadow
    const { sendResetLink } = this.props;

    if (this.handleValidation()) {
      sendResetLink(email);
    } else if (success && this.handleValidation()) {
      this.setState({ email: '' });
    }
  }

  /**
   *
   *
   * @returns {JSX} - Jsx
   * @memberof PasswordReset
   *
   */
  render() {
    const { email, errors } = this.state;
    const {
      passwordError,
      passwordReset: { isSending, success },
    } = this.props;

    return (
      <div>
        <Modal
          trigger={<Button>Show Modal</Button>}
          centered={false}
          closeIcon
          id="modal"
        >
          <Modal.Header>
            <div>
              <img src={Lock} alt="lock" className="lock" />
            </div>
            Recover your password
          </Modal.Header>

          <Modal.Content>
            {success && (
              <Message
                success
                header="Password Reset link sent"
                content="Kindly check your mail for the reset link"
              />
            )}
            <Form size="huge" onSubmit={this.handleSubmit}>
              <Form.Field>
                <input
                  type="text"
                  placeholder="E-mail Address"
                  className={`input-field ${
                    errors.email ? ' err-feedback' : ''
                  }`}
                  onChange={this.handleChange}
                  value={email}
                  name="email"
                  onFocus={e => this.onFocusClear(e.target.name)}
                />
                {[
                  errors.email ? (
                    <small className="err-msg">{errors.email}</small>
                  ) : (
                    ''
                  ),
                  passwordError.length > 0 && (
                    <small className="err-msg">{passwordError[0]}</small>
                  ),
                ]}
              </Form.Field>
              <Button type="submit" className="reset-btn">
                {!isSending ? (
                  'Send password reset link'
                ) : (
                  <span className="spinner" />
                )}
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

PasswordResetLink.propTypes = {
  sendResetLink: PropTypes.func.isRequired,
  passwordReset: PropTypes.shape({
    isSending: PropTypes.bool,
  }).isRequired,
  passwordError: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string]))
    .isRequired,
};

/**
 *
 * @param {state} state
 * @returns
 * @returns {state} Redux state
 */
const mapStateToProps = state => ({
  passwordReset: state.passwordReset,
  passwordError: state.passwordReset.errors,
});

export default connect(
  mapStateToProps,
  { sendResetLink }
)(PasswordResetLink);
