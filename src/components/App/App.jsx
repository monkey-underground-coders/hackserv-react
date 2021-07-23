import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Dashboard from "@components/Dashboard";
import { SignUpPage } from "@components/SignUp";
import { LoginPage } from "@components/Login";
import PreloaderWrapper from "@components/PreloaderWrapper";
import { LoggedInRoute, UserRoute } from "@components/ConditionalRoute";
import { ValidateEmailPage } from "@components/ValidateEmail";
import ValidateEmailById from "@components/ValidateEmailById";

const App = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
    <PreloaderWrapper>
      <Router>
        <Switch>
          <Route path="/user/create" component={SignUpPage} />
          <Route path="/user/login" component={LoginPage} />
          <LoggedInRoute path="/user/validate" component={ValidateEmailPage} />
          <Route path="/user/email-link" component={ValidateEmailById} />
          <UserRoute path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Router>
    </PreloaderWrapper>
  </SnackbarProvider>
);

export default App;
