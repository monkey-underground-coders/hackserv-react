import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { useQueryParams } from "@utils";
import { emailValidateById } from "@redux/users";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ValidateEmailById = () => {
  const params = useQueryParams();
  const paramsValid = !isNaN(params.user) && typeof params.id === "string";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState(paramsValid ? null : "/");
  const classes = useStyles();
  console.log(params, paramsValid, redirectTo, loading);
  useEffect(() => {
    if (!loading && redirectTo === null) {
      setLoading(true);
      dispatch(emailValidateById({ id: params.id, userId: +params.user })).then(
        () => setRedirectTo("/")
      );
    }
  }, [loading, setLoading, dispatch, params, redirectTo]);

  if (redirectTo !== null) {
    return <Redirect to={redirectTo} />;
  } else {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
};

export default ValidateEmailById;
