import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';

/**
 * Routes Component
 * @returns {JSX.Element} application routes
 */
const Routes = () => (
  <Switch>
    <Route path="/:authType(login|register)?" component={Home} exact />
    <Route path="/recipes/create" render={() => <div>Create a Recipe</div>} />
    <Route component={Home} />
  </Switch>
);

export default Routes;
