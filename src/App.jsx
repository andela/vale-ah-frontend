import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import store from './store/store';

/**
 * @description - App component
 * @param {object} props
 * @returns {JSX} - Returns all Components
 */
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <h1>Welcome to Naija Chop Chop</h1>
        <Routes />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
