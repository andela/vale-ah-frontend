import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Routes from './routes/Routes';
import store from './store/store';

/**
 * @description - App component
 * @returns {JSX} - Returns all Components
 */
class App extends React.Component {
  /**
   * @returns {undefined}
   */
  componentDidMount() {
    window.addEventListener('app-toast', event => {
      if (event.detail.type === 'error') {
        event.detail.messages.forEach(message => toast.error(message));
      } else if (event.detail.type === 'success') {
        event.detail.messages.forEach(message => toast.success(message));
      } else {
        event.detail.messages.forEach(message => toast.info(message));
      }
    });
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
