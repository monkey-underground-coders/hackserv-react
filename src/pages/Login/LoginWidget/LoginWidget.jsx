import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { unwrapResult } from "@reduxjs/toolkit";

import { login } from "@redux/auth/thunks";
import { useMySnackbar } from "@utils/hooks";
import { emailPasswordSchema } from "@validation/yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkDecor: {
    color: theme.palette.primary.main,
  },
}));

export default function LoginWidget({ redirectTo = "/dashboard" }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueError } = useMySnackbar();

  const onSubmit = ({ email, password }, bag) =>
    dispatch(login({ email, password }))
      .then(unwrapResult)
      .then(() => {
        history.push(redirectTo);
      })
      .catch((e) => {
        if (e.message.endsWith("401")) {
          enqueueError("Неверный email или пароль");
        } else {
          enqueueError("Возникла непредвиденная ошибка");
        }
      });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckCircleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={emailPasswordSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                name="email"
                label="Email"
                type="email"
                fullWidth
                autoComplete="username"
                autoFocus
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                name="password"
                label="Пароль"
                type="password"
                fullWidth
                required
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Войти
              </Button>
              {isSubmitting && <LinearProgress />}
              <Grid container>
                <Grid item xs>
                  <Link
                    to=""
                    href="#"
                    className={classes.linkDecor}
                    variant="body2"
                  >
                    {"Забыли пароль?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/user/create"
                    className={classes.linkDecor}
                    variant="body2"
                  >
                    {"Нет аккаунта? Зарегистрируйтесь"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
