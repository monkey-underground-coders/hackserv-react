import React, { useCallback } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useStore } from "react-redux";
import PropTypes from "prop-types";

import RenderFetch from "../RenderFetch";

/**
 * Provides a fetch-before-render strategy with Redux addition.
 *
 * Works just like RenderFetch. onFetch call replaced to the action dispatch.
 *
 * @see RenderFetch
 */
const ReduxRenderFetch = ({
  component: Component,
  action,
  selector = () => {},
  ...rest
}) => {
  const { dispatch, getState } = useStore();

  const handleFetch = useCallback(
    () => dispatch(action(selector(getState()))).then(unwrapResult),
    [action, selector, getState, dispatch]
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
   * The selector function in terms of Redux
   */
  selector: PropTypes.func,
  /**
   * The action (thunk) supplier
   *
   * If selector is provided, action will receive selected value as a parameter
   *
   * @param {any} selector's result
   * @returns {Object}
   */
  action: PropTypes.func.isRequired,
};

/**
 * Wraps Component with ReduxRenderFetch
 *
 * @param {React.FC} Component The component to wrap
 * @param {Function} action The action (thunk) supplier
 * @param {Function} selector The selector
 * @returns React component
 */
export const withReduxRenderFetch = (Component, action, selector) => (props) =>
  (
    <ReduxRenderFetch
      component={Component}
      action={action}
      selector={selector}
      {...props}
    />
  );

export default ReduxRenderFetch;
