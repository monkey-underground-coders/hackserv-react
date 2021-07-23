import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import { Redirect } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import {
  emailRequest,
  emailValidate,
  getSelfUserSelector,
  lastEmailRequestAtSelector,
} from "@redux/users";
import { unwrapResult } from "@reduxjs/toolkit";
import { useMySnackbar } from "@utils";
import { emailValidateSchema } from "@schemas/user";
import FormikSubmitButton from "@components/FormikSubmitButton";
import { minEmailReqSelector } from "@redux/conf";
import MaterialLink from "@components/MaterialLink";
import { logout } from "@redux/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginTop: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(0, 1, 0, 1),
    backgroundColor: theme.palette.primary.main,
  },
  avatarLogo: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  form: {
    width: "100%",
    "& > *": {
      marginTop: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkDecor: {
    color: theme.palette.primary.main,
  },
}));

const calcUntilEmailReq = (lastEmailRequestAt, minEmailReq) => {
  if (lastEmailRequestAt === null) {
    return 0;
  }
  const now = Date.now();
  return Math.max(
    Math.ceil((lastEmailRequestAt + minEmailReq * 1000 - now) / 1000),
    0
  );
};

const ValidateEmailWidget = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueError, enqueueInfo } = useMySnackbar();

  const { id: userId, email } = useSelector(getSelfUserSelector);
  const lastEmailRequestAt = useSelector(lastEmailRequestAtSelector);
  const minEmailReq = useSelector(minEmailReqSelector);
  const [redirect, setRedirect] = useState(false);
  const [pushingRequest, setPushingRequest] = useState(false);
  const [requestedAtStart, setRequestedAtStart] = useState(false);

  const [untilEmailReq, setUntilEmailReq] = useState(
    calcUntilEmailReq(lastEmailRequestAt, minEmailReq)
  );

  useEffect(() => {
    if (untilEmailReq > 0) {
      const timer = setTimeout(
        () => setUntilEmailReq(Math.max(untilEmailReq - 1, 0)),
        1000
      );

      return () => clearTimeout(timer);
    }
  });

  useEffect(
    () => setUntilEmailReq(calcUntilEmailReq(lastEmailRequestAt, minEmailReq)),
    [lastEmailRequestAt, minEmailReq]
  );

  useEffect(() => {
    if (!requestedAtStart) {
      setRequestedAtStart(true);
      setPushingRequest(true);
      dispatch(emailRequest({ userId }))
        .then(unwrapResult)
        .catch((e) => e)
        .finally(() => setPushingRequest(false));
    }
  }, [requestedAtStart, dispatch, userId]);

  const handleSubmit = ({ token }, { setFieldError }) =>
    dispatch(emailValidate({ userId, token }))
      .then(unwrapResult)
      .then(() => setRedirect(true))
      .catch((e) => {
        const errorCode = e?.response.status;
        if (errorCode === 403) {
          setFieldError("token", "Токен неверен");
          enqueueError("Токен неверен");
        } else {
          enqueueError(e);
        }
      });

  const handleRequestTokenClick = () => {
    setPushingRequest(true);
    return dispatch(emailRequest({ userId }))
      .then(unwrapResult)
      .then(() => enqueueInfo("Новый токен был отправлен!"))
      .catch((e) => {
        const errorCode = e?.response.status;
        if (errorCode === 429) {
          enqueueError("Слишком частые запросы!");
        } else {
          enqueueError(e);
        }
      })
      .finally(() => setPushingRequest(false));
  };

  const handleLogoutClick = () => dispatch(logout());

  const linkDisabled = untilEmailReq > 0 || pushingRequest;

  if (redirect) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Подтвердите email
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Введите токен из письма, который был выслан на {email}
          </Typography>
          <Formik
            initialValues={{ token: "" }}
            validationSchema={emailValidateSchema}
            onSubmit={handleSubmit}
          >
            <Form className={classes.form}>
              <Field
                component={TextField}
                name="token"
                label="Токен"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
              <FormikSubmitButton fullWidth variant="contained" color="primary">
                Отправить
              </FormikSubmitButton>
            </Form>
          </Formik>
          <Grid container>
            <Grid item xs>
              <MaterialLink onClick={handleLogoutClick}>Выйти</MaterialLink>
            </Grid>
            <Grid item>
              <MaterialLink
                onClick={handleRequestTokenClick}
                disabled={linkDisabled}
              >
                Запросить новый токен{" "}
                {untilEmailReq > 0 && `(${untilEmailReq} с)`}
              </MaterialLink>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
};

export default ValidateEmailWidget;
