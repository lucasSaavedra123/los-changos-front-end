import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";

import Home from './Sections/Home';
import Settings from './Sections/Settings';

import SideBar from '../Sidebar';

export const Profile = () => {
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();

  console.log("autenticado:", isAuthenticated)
  console.log("usuario:", user)


  return (
    <>
      <Router>
        <SideBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </Router>
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LandingPage />,
});
