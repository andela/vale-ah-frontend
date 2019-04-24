import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import CreateRecipe from '../pages/Recipe/CreateRecipes/CreateRecipe';
import Auth from '../components/Auth/Auth';

/**
 * Routes Component
 * @returns {JSX.Element} application routes
 */
const Routes = () => (
  <Switch>
    <Route path="/:authType(login|register)?" component={Home} exact />
    <Route path="/recipes/create" component={CreateRecipe} exact />
    <Route path="/api/auth" component={Auth} exact />
    <Route component={Home} />
  </Switch>
);

export default Routes;
