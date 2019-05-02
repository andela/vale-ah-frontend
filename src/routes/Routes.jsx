import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PasswordResetEmail from '../components/Auth/PasswordResetEmail';
import PasswordReset from '../components/Auth/PasswordReset';
import Home from '../pages/Home/Home';
import CreateRecipe from '../pages/Recipe/CreateRecipes/CreateRecipe';
import Login from '../components/Login/Login';

/**
 * Routes Component
 * @returns {JSX.Element} application routes
 */
const Routes = () => (
  <Switch>
    <Route path="/:authType(login|register)?" component={Home} exact />
    <Route path="/recipes/create" component={CreateRecipe} exact />
    <Route path="/login" component={Login} exact />
    <Route path="/password/reset" component={PasswordResetEmail} exact />
    <Route path="/api/users/reset-password" component={PasswordReset} exact />
    <Route component={Home} exact />
  </Switch>
);

export default Routes;
