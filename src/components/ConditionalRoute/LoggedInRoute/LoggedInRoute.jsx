import React from "react";
import PropTypes from "prop-types";

import { loggedInSelector } from "@redux/auth/selectors";
import ConditionalRoute from "../ConditionalRoute";

/**
 * Works like Route from "react-router".
 *
 * If the user is logged in, renders Route.
 * Otherwise, it renders Redirect to the login page.
 *
 * @see Route
 * @see Redirect
 */
const LoggedInRoute = ({ path, exact = false, component }) => (
  <ConditionalRoute
    path={path}
    exact={exact}
    conditionSelector={loggedInSelector}
    component={component}
    redirect="/user/login"
  />
);

LoggedInRoute.propTypes = {
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

export default LoggedInRoute;
