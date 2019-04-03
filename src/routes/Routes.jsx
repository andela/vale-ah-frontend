import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * @description - contains all the routes for the application
 * @param {object} props
 * @returns {route} - route
 */
const route = () => (
  <Fragment>
    <Switch>
      <Route path="/page1" render={() => <h3>Hello from page1</h3>} exact />
      <Route path="/page2" render={() => <h3>Hello from page2</h3>} exact />
    </Switch>
  </Fragment>
);

export default route;
