import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";

import Home from './Sections/Home';
import Reports from './Sections/Reports';
import Products from './Sections/Products';

import SideBar from '../Sidebar';

export const Profile = () => {
  const { user } = useAuth0();
  const { logout } = useAuth0();
  const { isAuthenticated } = useAuth0();

  console.log("autenticado:", isAuthenticated)
  console.log("usuario:", user)

  /*
  
  <div><button onClick={() => logout()}>Log Out</button> </div>
  
  */

  return (
    <>
      <Router>
        <SideBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
        </Switch>
      </Router>
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LandingPage />,
});
