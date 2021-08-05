import React, { useCallback } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import RenderFetch from "../RenderFetch";

const ReduxRenderFetch = ({ component: Component, action, ...rest }) => {
  const dispatch = useDispatch();

  const handleFetch = useCallback(
    () => dispatch(action()).then(unwrapResult),
    [action, dispatch]
  );

  return (
    <RenderFetch onFetch={handleFetch}>
      <Component {...rest} />
    </RenderFetch>
  );
};

export const withReduxRenderFetch = (Component, action) => (props) =>
  <ReduxRenderFetch component={Component} action={action} {...props} />;

export default ReduxRenderFetch;
