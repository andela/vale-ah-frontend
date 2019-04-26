import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'intro.js/minified/introjs.min.css';
import App from './App';
import './scss/main.scss';
import { checkAuth } from './utils/helpers';

checkAuth();

render(<App />, document.getElementById('app'));
