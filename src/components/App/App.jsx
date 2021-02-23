import Dashboard from "@components/Dashboard/Dashboard";
import { SignUpPage } from "@components/SignUp";
import { LoginPage } from "@components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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
