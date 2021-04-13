import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useStore } from "react-redux";

import { loggedInSelector } from "@redux/auth/selectors";

const PrivateRoute = (props) => {
  const condition = useSelector(loggedInSelector);
  const store = useStore();
  console.log(condition, store.getState());

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/user/login" />
  );
};

export default PrivateRoute;
