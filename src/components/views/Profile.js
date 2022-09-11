
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";

import Home from './Sections/Home';
import Settings from './Sections/Settings';

import ProfileNavigator from '../ProfileNavigator';

import * as React from 'react';


export default function TemporaryDrawer() {

  return (
    <div>
      <ProfileNavigator />
    </div>
  );
}
