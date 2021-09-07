import React, { useCallback } from "react";
import NotFoundPage from "@components/NotFoundPage";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RenderFetch from "../RenderFetch";

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
    () => dispatch(action({ id: +idParam })).then(unwrapResult).catch(error => console.error(error)),
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
