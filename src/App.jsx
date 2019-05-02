import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './routes/Routes';
import store from './store/store';
import { showToast, checkAuth } from './utils/helpers';
import { authSuccessAction, clearError } from './actions/auth/auth-actions';

/**
 * @description - App component
 * @returns {JSX} - Returns all Components
 */
class App extends React.Component {
  /**
   * @returns {undefined}
   */
  async componentDidMount() {
    const user = await checkAuth();
    if (user) store.dispatch(authSuccessAction({ user }));
    else store.dispatch(clearError());

    window.addEventListener('app-toast', e =>
      showToast(e.detail.messages, e.detail.type)
    );
  }

  /**
   * @returns {JSX.Element} renders App
   */
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          newestOnTop={false}
          bodyClassName="my-toast"
          progressClassName="toast-progress"
        />
      </Provider>
    );
  }
}

export default App;
