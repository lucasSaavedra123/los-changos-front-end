import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Switch, Route, Redirect, Navigate } from 'react-router-dom';
import Home from "./components/Sections/Home";
import ProfileNavigator from "./components/ProfileNavigator";
import Settings from "./components/Sections/Settings";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const App = () => {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : window.location.href = "/login"
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/register'><Register/></Route>
        <Route path='/profile/home'><ProfileNavigator /><Home /></Route>
        <Route path='/profile/settings'><ProfileNavigator /><Settings /></Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}


export default App;
