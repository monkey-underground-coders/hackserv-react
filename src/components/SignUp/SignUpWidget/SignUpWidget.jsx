import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";
import { FormatListNumberedTwoTone } from "@material-ui/icons";

import VkLogo from "@assets/vk-logo.svg";
import GoogleLogo from "@assets/google-logo.svg";
import GitLogo from "@assets/GitHub-logo.svg";
import { userCreate } from "@redux/users";
import { parseErrors } from "@utils/parse";
import {
  useInput,
  isEmail,
  minLength,
  isNotEmpty,
} from "@validation/formValidation";
import { useMySnackbar } from "@utils/hooks";

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
  avatarLogo: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkdecor: {
    color: theme.palette.primary.main,
  },
}));

export default function SignUpWidget() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();

  const email = useInput("", isNotEmpty(), isEmail());
  const password = useInput("", isNotEmpty(), minLength(5));

  const allValid = email.isValid && password.isValid;

  const handleClick = (event) => {
    event.preventDefault();
    const emailVal = email.value;
    const passwordVal = password.value;
    if (allValid) {
      dispatch(userCreate({ emailVal, passwordVal }))
        .then(unwrapResult)
        .catch((error) => {
          console.log(error)
          if (error.message === "Email already exist") {
            enqueueError(parseErrors(error.message));
          } else {
            enqueueError("Что-то пошло не так...");
          }
        });
    }
    if (!email.isEmail) {
      enqueueError(`Email введен некорректно`);
    }
    if (!password.minLength) {
      enqueueError(`Пароль должен быть минимум 5 символов`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Зарегистрироваться
        </Typography>
        <Grid container spacing={4} justify={"center"}>
          <Grid item xs={6} sm={2}>
            <Link to="/oauth2/authorization/vk">
              <Avatar src={VkLogo} className={classes.avatarLogo} />
            </Link>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Link to="/oauth2/authorization/google">
              <Avatar src={GoogleLogo} className={classes.avatarLogo} />
            </Link>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Link to="/oauth2/authorization/github">
              <Avatar src={GitLogo} className={classes.avatarLogo} />
            </Link>
          </Grid>
        </Grid>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={
                  (email.isDirty && email.isError)
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email.value}
                onBlur={(evt) => email.onBlur(evt)}
                onChange={(evt) => {
                  email.onChange(evt);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  (password.isDirty && password.isError)
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password.value}
                onBlur={(evt) => password.onBlur(evt)}
                onChange={(evt) => password.onChange(evt)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox value="privacyPolicyAgreement" color="primary" />
                }
                label="Я согласен с политикой конфиденциальности и на обработку моих персональных данных"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Зарегистрироваться
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/user/login" className={classes.linkdecor}>
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
