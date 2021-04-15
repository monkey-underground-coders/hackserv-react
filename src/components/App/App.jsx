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
import PreloaderWrapper from "@components/PreloaderWrapper";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
      <PreloaderWrapper>
        <Router>
          <Switch>
            <Route path="/user/create" component={SignUpPage} />
            <Route path="/user/login" component={LoginPage} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Router>
      </PreloaderWrapper>
    </SnackbarProvider>
  );
}

export default App;
