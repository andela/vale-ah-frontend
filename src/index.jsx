import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'intro.js/minified/introjs.min.css';
import { Provider } from 'react-redux';
import App from './App';
import './scss/main.scss';
import store from './store/store';

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(jsx, document.getElementById('app'));
