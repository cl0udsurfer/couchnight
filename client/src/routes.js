import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import {
  HOME_PAGE,
  LOGIN_PAGE,
  LISTINGS_PAGE,
  LISTING_PAGE,
  USER_PAGE,
  HOST_PAGE,
} from 'lib/settings/constants';
import { LayoutMain } from 'sections/Layout';
import { AuthContext } from 'lib/context/AuthProvider';
import { ErrorBanner, LoadingSpin } from 'lib/components';

import Stripe from 'sections/Stripe';

const Loading = () => <LoadingSpin message='Loading...' />;

const routes = [
  {
    path: HOME_PAGE,
    component: Loadable({
      loader: () => import('./sections/Home'),
      loading: Loading,
      modules: ['Home'],
    }),
    exact: true,
  },
  {
    path: LOGIN_PAGE,
    component: Loadable({
      loader: () => import('./sections/SignIn'),
      loading: Loading,
      modules: ['SignIn'],
    }),
    exact: true,
  },
  {
    path: LISTINGS_PAGE,
    component: Loadable({
      loader: () => import('./sections/Listings'),
      loading: Loading,
      modules: ['Listings'],
    }),
    exact: true,
  },
  {
    path: LISTING_PAGE,
    component: Loadable({
      loader: () => import('./sections/Listing'),
      loading: Loading,
      modules: ['Listing'],
    }),
    exact: true,
  },
  {
    path: USER_PAGE,
    component: Loadable({
      loader: () => import('./sections/User'),
      loading: Loading,
      modules: ['User'],
    }),
  },
  {
    path: HOST_PAGE,
    component: Loadable({
      loader: () => import('./sections/Host'),
      loading: Loading,
      modules: ['Host'],
    }),
  },
];

const NotFound = Loadable({
  loader: () => import('./sections/NotFound'),
  loading: Loading,
  modules: ['NotFound'],
});

const Routes = () => {
  const { error, viewer, setViewer } = useContext(AuthContext);

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <LayoutMain>
      {logInErrorBannerElement}
      <Switch>
        {routes.map(({ path, component, exact = false }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
        <Route
          exact
          path='/stripe'
          render={(props) => (
            <Stripe {...props} viewer={viewer} setViewer={setViewer} />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </LayoutMain>
  );
};
export default Routes;
