import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import Routes from './routes/Routes';
import { showToast } from './utils/helpers';
import { checkAuth } from './actions/auth/auth-dispatchers';

/**
 * @description - App component
 * @returns {JSX} - Returns all Components
 */
class App extends React.Component {
  /**
   * @returns {undefined}
   */
  async componentDidMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
    window.addEventListener('app-toast', e =>
      showToast(e.detail.messages, e.detail.type)
    );
  }

  /**
   * @returns {JSX.Element} renders App
   */
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          newestOnTop={false}
          bodyClassName="my-toast"
          progressClassName="toast-progress"
        />
      </Fragment>
    );
  }
}

App.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { getCurrentUser: checkAuth }
)(App);
