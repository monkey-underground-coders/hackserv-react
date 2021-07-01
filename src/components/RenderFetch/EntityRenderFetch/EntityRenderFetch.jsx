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

  if (
    idParam === null ||
    idParam === undefined ||
    !/^[1-9]\d*$/.test(idParam)
  ) {
    return <NotFoundPage />;
  }

  const handleFetch = (id) => dispatch(action({ id })).then(unwrapResult);

  return (
    <RenderFetch onFetch={handleFetch}>
      <Component entityId={+idParam} {...rest} />
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
