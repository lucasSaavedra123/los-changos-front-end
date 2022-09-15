
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";

import Home from './Sections/Home';
import { Settings } from './Sections/Settings';

import ProfileNavigator from '../ProfileNavigator';

import * as React from 'react';


export const Profile = () => {

  return (

    <Router>
      <ProfileNavigator />
      <Switch>
        <Route exact path='/profile/home'><Home/></Route>
        <Route path='/profile/settings'><Settings/></Route>
      </Switch>
    </Router>

  );

}


export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LandingPage />,
});
