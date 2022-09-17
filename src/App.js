import LandingPage from "./components/views/LandingPage";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./components/views/Sections/Home";
import ProfileNavigator from "./components/ProfileNavigator";
import Settings from "./components/views/Sections/Settings";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/profile/home'><ProfileNavigator /><Home /></Route>
        <Route path='/profile/settings'><ProfileNavigator /><Settings /></Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}


export default App;
