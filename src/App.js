import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";

const Auth = () => {
  return (
    <Router>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/forgot-password' component={Forgot} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default Auth;
