import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "flex",
    justifyContent: "center",
  },
}));

const RenderFetch = ({ onFetch, render, children }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);
    return onFetch().finally(() => setLoading(false));
  }, [onFetch, setLoading]);

  useEffect(fetch, [fetch]);

  if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  }
  return render ? render(fetch) : children;
};

export default RenderFetch;
