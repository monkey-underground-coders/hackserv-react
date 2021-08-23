import React from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { useParamSelector } from "@utils";
import StageRedirect from "@components/StageRedirect";

/**
 * Works like Route from "react-router" but checks a condition.
 * If that condition is true, the component will render Route.
 * Otherwise, the component will render Redirect to the specified path.
 *
 * @see Route
 * @see Redirect
 */
const ConditionalRoute = ({
  path,
  exact = false,
  conditionSelector,
  component,
  redirect = false,
}) => {
  const match = useRouteMatch({ path, exact });
  const condition = useParamSelector(conditionSelector, match);
  console.debug(`ConditionalRoute to ${path} decision:`, condition);

  return condition ? (
    <Route path={path} exact={exact} component={component} />
  ) : redirect ? (
    <Redirect to={redirect} />
  ) : (
    <StageRedirect />
  );
};

ConditionalRoute.propTypes = {
  /**
   * The path to be routed
   *
   * @see Route
   */
  path: PropTypes.string.isRequired,
  /**
   * The flag indicating whether the router should route the path exactly as it is
   *
   * @default false
   * @see Route
   */
  exact: PropTypes.bool,
  /**
   * The selector function in terms of Redux.
   *
   * It receives the match object from React Router as a first argument (match of the provided path).
   *
   * @param {Object} Redux state
   * @param {import("react-router-dom").match} the match object
   * @returns {boolean} whether Route (true) or Redirect (false) should be rendered
   */
  conditionSelector: PropTypes.func.isRequired,
  /**
   * The component to route to
   *
   * @see Route
   */
  component: PropTypes.elementType.isRequired,
  /**
   * The path to be routed if the condition is false
   *
   * Uses StageRedirect if empty
   *
   * @see StageRedirect
   */
  redirect: PropTypes.string,
};

export default ConditionalRoute;
