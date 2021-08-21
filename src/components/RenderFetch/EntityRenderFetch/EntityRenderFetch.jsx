import React, { useCallback } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import RenderFetch from "../RenderFetch";
import NotFoundPage from "@components/NotFoundPage";

/**
 * Provides a fetch-before-render strategy with Redux and React Router addition.
 *
 * This component works like ReduxRenderFetch. The action method will be called
 * with a parameter from React Router.
 *
 * An example. User and UserLoader - components, getUserByIdFromDB - thunk
 * with a parameter { id }, getUserByIdSelector - selector with a parameter
 * { id }, App - root React component.
 *
 * const getUserByIdSelector = (state, { id }) => state.user.entities[id]
 *
 * const getUserByIdFromDB = createAsyncThunk(
 *   "user/getById",
 *   async ({ id }) => {
 *     return await fetch(`/api/user/${id}`);
 *   }
 * )
 *
 * const User = ({ id }) => {
 *   const { name } = useSelector((state) => getUserByIdSelector(state, { id }));
 *   return (
 *     <span>{name}</span>
 *   );
 * }
 *
 * const UserLoader = () => (<EntityRenderFetch component={B} idField="id" action={getUserByIdFromDB} />)
 *
 * const App = () => (
 *   <Switch>
 *     <Route path="/user/:id" component={UserLoader} />
 *   </Switch>
 * )
 *
 * In the above example, let URL=/user/42. When UserLoader is rendering, thunk
 * getUserByIdFromDB will be called with parameter { id: 42 }. After the
 * completion of the thunk call, EntityRenderFetch will render User with
 * props={{ id: 42 }}.
 *
 * @see RenderFetch
 * @see ReduxRenderFetch
 */
const EntityRenderFetch = ({
  component: Component,
  idField,
  action,
  ...rest
}) => {
  const params = useParams();
  const dispatch = useDispatch();

  const idParam = params[idField];

  const handleFetch = useCallback(
    () => dispatch(action({ id: +idParam })).then(unwrapResult),
    [dispatch, action, idParam]
  );

  if (
    idParam === null ||
    idParam === undefined ||
    !/^[1-9]\d*$/.test(idParam)
  ) {
    return <NotFoundPage />;
  }

  const props = {
    [idField]: +idParam,
    ...rest,
  };

  return (
    <RenderFetch onFetch={handleFetch}>
      <Component {...props} />
    </RenderFetch>
  );
};

EntityRenderFetch.propTypes = {
  /**
   * The component type to be rendered
   */
  component: PropTypes.elementType.isRequired,
  /**
   * The identifier of a param to be extracted from React Router Route path
   *
   * @see {Route}
   */
  idField: PropTypes.string.isRequired,
  /**
   * The action (thunk) supplier
   *
   * @returns {Object}
   */
  action: PropTypes.func.isRequired,
};

/**
 * Wraps Component with EntityRenderFetch
 *
 * @param {React.FC} Component The component to wrap
 * @param {String} idField The identifier of a param from Route path
 * @param {Function} action The action (thunk) supplier
 * @returns React component
 */
export const withEntityRenderFetch = (Component, idField, action) => (props) =>
  (
    <EntityRenderFetch
      component={Component}
      action={action}
      idField={idField}
      {...props}
    />
  );

export default EntityRenderFetch;
