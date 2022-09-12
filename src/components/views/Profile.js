
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";

import Home from './Sections/Home';
import {Settings} from './Sections/Settings';

import ProfileNavigator from '../ProfileNavigator';

import * as React from 'react';


export const Profile = () => {

  return (

      <Router>
        <ProfileNavigator />
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </Router>

  );

}



/*
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LandingPage />,
});
*/