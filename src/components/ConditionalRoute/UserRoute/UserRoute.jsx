import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

import { loggedInSelector } from "@redux/auth";
import { getSelfUserSelector } from "@redux/users";

const UserRoute = ({ path, exact = false, component }) => {
  const loggedIn = useSelector(loggedInSelector);
  const userInfo = useSelector(getSelfUserSelector);
  const emailValidated = userInfo?.emailValidated;
  const decision = loggedIn && emailValidated;
  console.debug(
    `UserRoute to ${path} decision: ${decision}, loggedIn: ${loggedIn}, emailValidated: ${emailValidated}`
  );

  if (decision) {
    return <Route path={path} exact={exact} component={component} />;
  } else if (loggedIn) {
    return <Redirect to="/user/validate" />;
  } else {
    return <Redirect to="/user/login" />;
  }
};

export default UserRoute;
