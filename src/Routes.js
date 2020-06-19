import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Minimal as MinimalLayout } from './layouts';

import {
  SignIn as SignInView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
