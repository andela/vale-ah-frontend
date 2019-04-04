import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import store from './store/store';
import Recipe from './pages/Recipe/Recipe';

/**
 * @description - App component
 * @param {object} props
 * @returns {JSX} - Retuerns all Component
 */
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <h1>Welcome to Naija Chop Chop</h1>
        <Recipe />
        <Routes />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
