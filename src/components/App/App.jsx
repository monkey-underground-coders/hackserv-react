import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Dashboard from "@pages/Dashboard";
import { SignUpPage } from "@pages/SignUp";
import { LoginPage } from "@pages/Login";
import PreloaderWrapper from "@components/PreloaderWrapper";
import { ValidateEmailPage } from "@pages/ValidateEmail";
import ValidateEmailById from "@pages/ValidateEmailById";
import AttendeeForm from "@pages/AttendeeForm";
import StageRedirect from "@components/StageRedirect";
import StageRoute from "@components/StageRoute";
import UserRoute from "@components/StageRoute/UserRoute";

const App = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
    <PreloaderWrapper>
      <Router>
        <Switch>
          <Route path="/user/create" component={SignUpPage} />
          <Route path="/user/login" component={LoginPage} />
          <StageRoute
            stage={0}
            path="/user/validate"
            component={ValidateEmailPage}
          />
          <Route path="/user/email-link" component={ValidateEmailById} />
          <StageRoute
            stage={[1, 2]}
            path="/hacker-form"
            component={AttendeeForm}
          />
          <UserRoute path="/dashboard" component={Dashboard} />
          <StageRedirect from="/" />
        </Switch>
      </Router>
    </PreloaderWrapper>
  </SnackbarProvider>
);

export default App;
