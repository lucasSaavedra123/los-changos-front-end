import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LandingPage from "./LandingPage";


export const Profile = () => {
  const { user } = useAuth0();
  const { logout } = useAuth0();
  const { isAuthenticated } = useAuth0();

  console.log(isAuthenticated)

  /*if (!isAuthenticated) {
    window.location.href = window.location.origin
  }*/

  console.log(user)

  return (
    <div className="mb-5">
        <button onClick={()=>logout({returnTo: window.location.origin})}>Logout</button>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LandingPage />,
});
