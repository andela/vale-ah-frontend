import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './scss/main.scss';
import { checkAuth } from './utils/helpers';

checkAuth();

render(<App />, document.getElementById('app'));
