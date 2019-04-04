import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';

const envVar = process.env.ENV_VAR;
/**
 * @description - App component
 * @param {object} props
 * @returns {JSX} - Returns all Components
 */
const App = () => (
  <BrowserRouter>
    <div>
      <h1>Welcome to Naija Chop Chop {envVar}</h1>
      <Routes />
    </div>
  </BrowserRouter>
);

export default App;
