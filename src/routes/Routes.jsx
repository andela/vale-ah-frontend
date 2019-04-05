import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';

/**
 * @description - contains all the routes for the application
 * @param {object} props
 * @returns {route} - route
 */
const routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/page1" render={() => <h3>Hello from page1</h3>} exact />
    <Route path="/page2" render={() => <h3>Hello from page2</h3>} exact />
    <Route path="/login" component={Login} exact />
  </Switch>
);

export default routes;
