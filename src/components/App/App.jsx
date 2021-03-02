import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "@components/Dashboard";
import { SignUpPage } from "@components/SignUp";
import { LoginPage } from "@components/Login";
import PrivateRoute from "@components/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user/create" component={SignUpPage} />
        <Route path="/user/login" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Redirect from="/" to="/user/login" />
      </Switch>
    </Router>
  );
}

export default App;
