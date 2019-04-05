import React, { Component } from 'react';
import SocialButton from '../../components/Social/SocialButton';
import SignupButton from '../../components/Button/Button';
import google from '../../images/google.jpg';
import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
/**
 * @class Signup
 */
export default class Signup extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = {};
  }

  /**
   * @function render
   * @returns {undefined}
   */
  render() {
    return (
      <form>
        <div className="auth_form">
          <h1 className="logoname">Join Naija Chop Chop</h1>
          <SocialButton
            image={google}
            description=" Sign up with Google"
            background="#3E82F7"
          />
          <SocialButton
            image={facebook}
            description="Sign up with Facebook"
            background="#475993"
          />
          <SocialButton
            image={twitter}
            description="Sign up with Twitter"
            background="#03A9F4"
          />
          <div className="horizontal_box">
            <ul>
              <li>
                <hr className="horizontal_line" />
              </li>
              <li id="or">or</li>
              <li>
                <hr className="horizontal_line" />
              </li>
            </ul>
          </div>
          <input type="text" placeholder="Username" className="textfield" />
          <input type="password" placeholder="Password" className="textfield" />
          <input type="text" placeholder="Email" className="textfield" />
          <SignupButton title="Sign up" />
          <p className="signup_text">
            You already have an account?
            <a href="google.com" className="signup_link">
              Log in
            </a>
          </p>
        </div>
      </form>
    );
  }
}
