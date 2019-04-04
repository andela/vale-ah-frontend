import React, { Component } from 'react';

/**
 * @class Signup
 */
export default class Signup extends Component {
  // /**
  //  * @constructor
  //  */
  // constructor() {
  //   super();
  //   this.state = {
  //         username: '',
  //         email: '',
  //         password: '',
  //       }
  // }

  //  /**
  //  * @param {*} event - event
  //  * @returns {object} - Changed state
  //  */
  // handleChange = event =>
  //  {
  //   this.setState({
  //       name: event.target.value
  //   });
  // }

  /**
   * @function render
   * @returns {undefined}
   */
  render() {
    return (
      <div id="signup_container">
        <h1>Join Naija ChopChop</h1>
        <form>
          <input type="text" name="username" onChange={this.handleChange} />
          <input type="password" name="password" onChange={this.handleChange} />
          <input type="email" name="email" onChange={this.handleChange} />
          <input type="submit" id="submit" />
        </form>
      </div>
    );
  }
}
