import React, { useCallback } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import RenderFetch from "../RenderFetch";

/**
 * Provides a fetch-before-render strategy with Redux addition.
 *
 * Works just like RenderFetch. onFetch call replaced to the action dispatch.
 *
 * @see RenderFetch
 */
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

ReduxRenderFetch.propTypes = {
  /**
   * The component type to be rendered
   */
  component: PropTypes.elementType.isRequired,
  /**
   * The action (thunk) supplier
   *
   * @returns {Object}
   */
  action: PropTypes.func.isRequired,
};

/**
 * Wraps Component with ReduxRenderFetch
 *
 * @param {React.FC} Component The component to wrap
 * @param {Function} action The action (thunk) supplier
 * @returns React component
 */
export const withReduxRenderFetch = (Component, action) => (props) =>
  <ReduxRenderFetch component={Component} action={action} {...props} />;

export default ReduxRenderFetch;
