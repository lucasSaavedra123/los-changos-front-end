import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";
import { Profile } from "./components/views/Profile";

const Auth = () => {
  return (
    <Router>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/forgot-password' component={Forgot} />
        {/* <Route path='/profile' component={Profile} /> */}
        <Route path='/' component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default Auth;
