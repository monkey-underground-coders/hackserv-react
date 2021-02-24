import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "@components/Dashboard";
import { SignUpPage } from "@components/SignUp";
import { LoginPage } from "@components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user/create" component={SignUpPage} />
        <Route path="/user/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect from="/" to="/user/login" />
      </Switch>
    </Router>
  );
}

export default App;
