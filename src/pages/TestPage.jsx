import { hot } from 'react-hot-loader/root';
import React from 'react';
import logo from '../../public/images/logo.svg';
import '../../public/css/App.scss';
import TestButton from '../components/TestButton';

/**
 * Render a dummy page to test react app
 * @returns {JSX} Page Component
 */
const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Naija ChopChop</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TestButton />
      </a>
      <p>React barebones</p>
    </header>
  </div>
);

export default hot(App);
