import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { loggedInSelector } from "@redux/auth/selectors";

const PrivateRoute = (props) => {
  const condition = useSelector(loggedInSelector);
  console.debug(`PrivateRoute to ${props.path} decision:`, condition);

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/user/login" />
  );
};

export default PrivateRoute;
