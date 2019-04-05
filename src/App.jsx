import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';

/**
 * @description - App component
 * @returns {JSX} - Returns all Components
 */
const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
