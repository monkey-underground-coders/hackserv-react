import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import {
  getConfig,
  isErrorSelector as confIsError,
  errorMessageSelector as confErrorMessage,
} from "@redux/conf";
import { tokens } from "@utils";
import { setTokens } from "@redux/auth/actions";
import {
  getSelf,
  isErrorSelector as usersIsError,
  errorMessageSelector as usersErrorMessage,
} from "@redux/users";
import { logout } from "@redux/auth/slices";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const PreloaderWrapper = ({ children }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingCausedError, setLoadingCausedError] = useState(false);
  const { dispatch, getState } = useStore();

  const classes = useStyles();

  useEffect(() => {
    if (!initialLoading) return;
    const fetchData = async () => {
      dispatch(setTokens(tokens.localStorageLoad()));

      await dispatch(getConfig());
      if (confIsError(getState())) {
        console.error("Config load error!", confErrorMessage(getState()));
        setLoadingCausedError(true);
        setInitialLoading(false);
        return;
      }

      await dispatch(getSelf());
      if (usersIsError(getState())) {
        console.error(
          "User load error! Emitting logout...",
          usersErrorMessage(getState())
        );
        dispatch(logout());
      }

      setInitialLoading(false);
    };
    fetchData();
  }, [initialLoading, dispatch, getState]);

  return (
    <>
      {initialLoading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!initialLoading && loadingCausedError && (
        <Backdrop className={classes.backdrop} open={true}>
          <h1>Что-то пошло не так!</h1>
        </Backdrop>
      )}
      {!initialLoading && !loadingCausedError && children}
    </>
  );
};

export default PreloaderWrapper;
