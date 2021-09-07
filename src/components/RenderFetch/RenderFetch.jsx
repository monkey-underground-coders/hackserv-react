import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import BigProgress from "@components/BigProgress";

/**
 * Provides a fetch-before-render strategy.
 *
 * Works in two steps:
 * 1) Calls onFetch. While onFetch is working, renders the loading screen
 * 2) When onFetch stop, renders children
 *
 * If the render function is provided, it will be called instead of rendering children.
 * Render function gets fetch function as a first argument. It can be used for manual fetch.
 */
const RenderFetch = ({ onFetch, render, children }) => {
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);
    return onFetch().finally(() => setLoading(false));
  }, [onFetch, setLoading]);

  useEffect(fetch, [fetch]);

  if (loading) {
    return <BigProgress />;
  }
  return render ? render(fetch) : children;
};

RenderFetch.propTypes = {
  /**
   * The function that will be called at the first render and on manual fetch.
   *
   * @async
   */
  onFetch: PropTypes.func,
  /**
   * The optional function which renders the children node
   * Don't use render and children simultaneously
   *
   * @returns {React.ReactNode}
   */
  render: PropTypes.func,
  /**
   * The children node to be rendered
   */
  children: PropTypes.node,
};

export default RenderFetch;
