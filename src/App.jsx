import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from './routes/Routes';

/**
 * @description - App component
 * @param {object} props
 * @returns {JSX} - Returns all Component
 */
const App = () => (
  <Router>
    <h1>Welcome to Naija Chop Chop</h1>
    <Route />
  </Router>
);

export default App;
