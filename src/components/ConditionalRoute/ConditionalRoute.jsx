import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ConditionalRoute = ({
  path,
  exact = false,
  conditionSelector,
  component,
  redirect,
}) => {
  const condition = useSelector(conditionSelector);
  console.debug(`ConditionalRoute to ${path} decision:`, condition);

  return condition ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={redirect} />
  );
};

export default ConditionalRoute;
