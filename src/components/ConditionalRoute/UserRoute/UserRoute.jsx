import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";

import { loggedInSelector } from "@redux/auth";
import { getSelfUserSelector } from "@redux/users";

/**
 * Works like Route from "react-router".
 *
 * If the user is logged in and their email is validated, renders Route.
 * Otherwise, it renders Redirect to the email validation page or the login page.
 *
 * @see Route
 * @see Redirect
 */
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

UserRoute.propTypes = {
  /**
   * The path to be routed
   *
   * @see Route
   */
  path: PropTypes.string,
  /**
   * The flag indicating whether the router should route the path exactly as it is
   *
   * @default false
   * @see Route
   */
  exact: PropTypes.bool,
  /**
   * The component to route to
   *
   * @see Route
   */
  component: PropTypes.elementType,
};

export default UserRoute;
