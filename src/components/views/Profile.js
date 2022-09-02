import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LandingPage from "./LandingPage";
import "../../assets/scss/profile-menu.scss"
import SideBar from "./Sidebar";
import { Switch } from "react-router-dom";

export const Profile = () => {
  const { user } = useAuth0();
  const { logout } = useAuth0();
  const { isAuthenticated } = useAuth0();

  console.log("autenticado:", isAuthenticated)
  console.log("usuario:", user)

  return (

    <Router id="Profile">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"Profile"} />

      <Switch>
        <Route path="/SectionOne" component={Home}/>
        <Route path="/SectionTwo" component={Settings}/>
      </Switch>


      <div id="page-wrap">
        <Home/>
        <Settings/>
      </div>

    </Router>

  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LandingPage />,
});
