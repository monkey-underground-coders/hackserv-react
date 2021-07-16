import React, { useState } from "react";
import { CircularProgress, IconButton } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { useMySnackbar } from "@utils";

const ActionButton = ({
  component: Component = IconButton,
  action,
  postAction = null,
  children,
  errorMessage,
  mainProps = {},
  loadingProps = {},
  ...rest
}) => {
  const [executing, setExecuting] = useState(false);
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();

  const handleClick = async () => {
    setExecuting(true);
    try {
      const result = await dispatch(action).then(unwrapResult);
      if (postAction !== null) {
        await postAction(result);
      }
    } catch (err) {
      console.error(err);
      enqueueError(
        typeof errorMessage === "function" ? errorMessage(err) : errorMessage
      );
    } finally {
      setExecuting(false);
    }
  };

  if (executing) {
    return (
      <Component {...loadingProps} {...rest}>
        <CircularProgress size={24} />
      </Component>
    );
  } else {
    return (
      <Component onClick={handleClick} {...mainProps} {...rest}>
        {children}
      </Component>
    );
  }
};

export default ActionButton;
