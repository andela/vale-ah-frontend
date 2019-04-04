import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';

/**
 * @description - App component
 * @param {object} props
 * @returns {JSX} - Returns all Components
 */
const App = () => (
  <BrowserRouter>
    <div>
      <h1>Welcome to Naija Chop Chop</h1>
      <Routes />
    </div>
  </BrowserRouter>
);

export default App;
