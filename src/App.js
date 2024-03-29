import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./components/Profile/Home";
import ProfileNavigator from "./components/Profile/ProfileNavigator";
import Settings from "./components/Profile/Settings";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Forgot from "./components/Forgot";
import CategoriesPage from "./components/CategoriesPage";
import BudgetPage from "./components/BudgetPage";
import "./assets/scss/root.scss"

const App = () => {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : window.location.href = "/login"
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/register'><Register /></Route>
        <Route path='/forgotPassword'><Forgot/> </Route>
        <Route path='/profile/home'><RequireAuth><ProfileNavigator /><Home /></RequireAuth></Route>
        <Route path='/profile/settings'><RequireAuth><ProfileNavigator /><Settings /></RequireAuth></Route>
        <Route path='/profile/categories'><RequireAuth><ProfileNavigator/><CategoriesPage/> </RequireAuth></Route>
        <Route path='/profile/budget'><RequireAuth><ProfileNavigator/> <BudgetPage/> </RequireAuth></Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}


export default App;
