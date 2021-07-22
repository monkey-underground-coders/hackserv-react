import React from "react";

import { loggedInSelector } from "@redux/auth/selectors";
import ConditionalRoute from "../ConditionalRoute";

const LoggedInRoute = ({ path, exact = false, component }) => (
  <ConditionalRoute
    path={path}
    exact={exact}
    conditionSelector={loggedInSelector}
    component={component}
    redirect="/user/login"
  />
);

export default LoggedInRoute;
