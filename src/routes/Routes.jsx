import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import CreateRecipe from '../pages/Recipe/CreateRecipes/CreateRecipe';
import EditRecipe from '../pages/Recipe/EditRecipe/EditRecipe';
import DummyPage from '../pages/DummyPage';

/**
 * Routes Component
 * @returns {JSX.Element} application routes
 */
const Routes = () => (
  <Switch>
    <Route path="/:authType(login|register)?" component={Home} exact />
    <Route path="/recipes/create" component={CreateRecipe} exact />
    <Route path="/recipes/edit-recipe/:id" component={EditRecipe} exact />
    <Route path="/recipes/dummy" component={DummyPage} exact />
    <Route component={Home} />
  </Switch>
);

export default Routes;
