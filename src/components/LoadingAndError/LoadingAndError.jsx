import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles, Typography } from "@material-ui/core";

import BigProgress from "@components/BigProgress";
import { parseError, UseLoadingEnum } from "@utils";
import CenteredPaper from "@components/CenteredPaper";
import NotFoundPage from "@components/NotFoundPage";

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const LoadingAndError = ({
  bundle = {},
  status: statusProp = null,
  loading: loadingProp = null,
  error: errorProp = null,
  loadingOnIdle = true,
  children,
}) => {
  const classes = useStyles();
  const status = statusProp ?? bundle.status;
  const loading = loadingProp ?? bundle.loading;
  const error = errorProp ?? bundle.error;
  if (loading || (status === UseLoadingEnum.IDLE && loadingOnIdle)) {
    return <BigProgress />;
  }
  if (error) {
    if (error.response?.status === 404) {
      return <NotFoundPage />;
    }
    return (
      <CenteredPaper>
        <div className={classes.icon}>
          <ErrorIcon fontSize="large" color="error" />
        </div>
        <Typography variant="h4" component="span">
          {parseError(error)}
        </Typography>
      </CenteredPaper>
    );
  }
  return children;
};

export default LoadingAndError;
