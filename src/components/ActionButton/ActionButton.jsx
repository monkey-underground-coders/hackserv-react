import React, { useState } from "react";
import { CircularProgress, IconButton } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { useMySnackbar } from "@utils";

const ActionButton = ({
  action,
  postAction = null,
  children,
  errorMessage,
  mainProps = {},
  loadingProps = {},
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
      <IconButton {...loadingProps}>
        <CircularProgress size="10" />
      </IconButton>
    );
  } else {
    return (
      <IconButton onClick={handleClick} {...mainProps}>
        {children}
      </IconButton>
    );
  }
};

export default ActionButton;
