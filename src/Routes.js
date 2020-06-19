import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  SignIn as SignInView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/home"
      />
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
