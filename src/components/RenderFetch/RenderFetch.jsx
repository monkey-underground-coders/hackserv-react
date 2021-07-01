import React, { useEffect, useState } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "flex",
    justifyContent: "center",
  },
}));

const RenderFetch = ({ onFetch, children }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (loading) {
      onFetch(params).finally(() => setLoading(false));
    }
  }, [loading, params, onFetch]);

  if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  }
  return children;
};

export default RenderFetch;
