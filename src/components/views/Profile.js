import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LandingPage from "./LandingPage";

export const Profile = () => {
  const { user } = useAuth0();
  const { logout } = useAuth0();
  const { isAuthenticated } = useAuth0();

  console.log("autenticado:", isAuthenticated)
  console.log("usuario:", user)

  return (
    <div><button onClick={() => logout()}>Log Out</button> </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LandingPage />,
});
