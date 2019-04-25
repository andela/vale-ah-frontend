import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '../node_modules/intro.js/minified/introjs.min.css';
import './scss/main.scss';
import { checkAuth } from './utils/helpers';

checkAuth();

render(<App />, document.getElementById('app'));
