import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { getConfig } from "@redux/conf";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const PreloaderWrapper = ({ children }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingCausedError, setLoadingCausedError] = useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (!initialLoading) return;

    const actions = [dispatch(getConfig())];

    Promise.all(actions)
      .catch((e) => {
        console.error(e);
        setLoadingCausedError(true);
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, [initialLoading]);

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
