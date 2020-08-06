import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';

import Register from './users/Register';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Reviews from './reviews/Index';
import NewReview from './reviews/New';
import EditReview from './reviews/Edit';
import { Fragment } from 'react';

function Routes({ user, setUser }) {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={(renderProps) => <Home {...renderProps} user={user} />}
      />
      <Route
        exact
        path='/register'
        render={(renderProps) => (
          <Register {...renderProps} setUser={setUser} />
        )}
      />
      <Route
        exact
        path='/login'
        render={(renderProps) => <Login {...renderProps} setUser={setUser} />}
      />
      <Route
        exact
        path='/logout'
        render={(renderProps) => <Logout {...renderProps} setUser={setUser} />}
      />

      <Route
        exact
        path='/reviews'
        render={(renderProps) => <Reviews {...renderProps} user={user} />}
      />
      <Route
        exact
        path='/reviews/new'
        render={(props) =>
          user ? <NewReview {...props} /> : <Redirect to='/' />
        }
      />
      <Route
        exact
        path='/reviews/edit'
        render={(props) =>
          user ? <EditReview {...props} /> : <Redirect to='/' />
        }
      />
    </Switch>
  );
}

export default Routes;
