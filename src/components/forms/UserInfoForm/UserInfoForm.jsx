import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";
import clsx from "clsx";

import { parseErrors } from "@utils/parse";
import {
  useInput,
  isEmail,
  minLength,
  isNotEmpty,
  isTelegram,
  isDateValid,
} from "@validation/formValidation";
import { useMySnackbar } from "@utils/hooks";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const userInfoInit = {
  firstName: "",
  middleName: "",
  lastName: "",
  telegram: "",
  dateOfBirth: "2021-04-01",
  workPlace: "",
  resume: "",
  otherInfo: "",
};

export default function UserInfoForm({ user }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userId = user.id;

  const [userInfo, setUserInfo] = useState(userInfoInit);

  const lastName = useInput("", isNotEmpty());
  const firstName = useInput("", isNotEmpty());
  const middleName = useInput("", isNotEmpty());
  const workPlace = useInput("", isNotEmpty());
  const telegram = useInput("", isNotEmpty(), isTelegram());
  const dateOfBirth = useInput("2021-04-01", isNotEmpty(), isDateValid());
  const otherInfo = useInput("", isNotEmpty());

  const allDisabled = lastName.isDisabled || firstName.isDisabled || middleName.isDisabled || workPlace.isDisabled || telegram.isDisabled || dateOfBirth.isDisabled || otherInfo.isDisabled;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Заполните данные о себе:
      </Typography>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              error={lastName.isDirty && lastName.isError}
              required
              id="lastName"
              name="lastName"
              label="Фамилия"
              fullWidth
              autoComplete="family-name"
              inputProps={{
                maxLength: 250,
              }}
              value={lastName.value}
              helperText={lastName.isDirty && lastName.isError ? lastName.errors : ""}
              disabled={allDisabled}
              onChange={(evt) => {
                lastName.onChange(evt);
                setUserInfo({ ...userInfo, lastName: evt.target.value })
              }}
              onBlur={(evt) => lastName.onBlurPut(userId, userInfo, allDisabled)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              error={firstName.isDirty && firstName.isError}
              id="firstName"
              name="firstName"
              label="Имя"
              fullWidth
              autoComplete="given-name"
              inputProps={{
                maxLength: 250,
              }}
              helperText={firstName.isDirty && firstName.isError ? firstName.errors : ""}
              disabled={allDisabled}
              onChange={(evt) => {
                firstName.onChange(evt);
                setUserInfo({ ...userInfo, firstName: evt.target.value })
              }}
              onBlur={(evt) => firstName.onBlurPut(userId, userInfo)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="middleName"
              name="middleName"
              label="Отчество"
              fullWidth
              autoComplete="additional-name"
              inputProps={{
                maxLength: 250,
              }}
              disabled={allDisabled}
              onChange={(evt) => {
                middleName.onChange(evt);
                setUserInfo({ ...userInfo, middleName: evt.target.value })
              }}
              onBlur={(evt) => middleName.onBlurPut(userId, userInfo)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={workPlace.isDirty && workPlace.isError}
              id="workPlace"
              name="workPlace"
              label="Университет/Школа/Место работы"
              fullWidth
              autoComplete="off"
              inputProps={{
                maxLength: 250,
              }}
              helperText={workPlace.isDirty && workPlace.isError ? workPlace.errors : ""}
              disabled={allDisabled}
              onChange={(evt) => {
                workPlace.onChange(evt);
                setUserInfo({ ...userInfo, workPlace: evt.target.value })
              }}
              onBlur={(evt) => workPlace.onBlurPut(userId, userInfo)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={telegram.isDirty && telegram.isError}
              required
              id="telegram"
              name="telegram"
              label="Telegram"
              fullWidth
              autoComplete="off"
              placeholder="@JustW4it"
              inputProps={{
                maxLength: 250,
                pattern: "^@(?=\\w{5,64}\\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$",
              }}
              helperText={
                telegram.isDirty && telegram.isError ? telegram.errors[0] : ""
              }
              disabled={allDisabled}
              onChange={(evt) => {
                telegram.onChange(evt);
                setUserInfo({ ...userInfo, telegram: evt.target.value })
              }}
              onBlur={(evt) => telegram.onBlurPut(userId, userInfo)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={dateOfBirth.isDirty && dateOfBirth.isError}
              required
              id="dateOfBirth"
              label="Дата рождения"
              type="date"
              defaultValue="2021-04-01"
              InputLabelProps={{
                shrink: true,
              }}
              helperText={
                dateOfBirth.isDirty && dateOfBirth.isError ? dateOfBirth.errors[0] : ""
              }
              disabled={allDisabled}
              onChange={(evt) => {
                dateOfBirth.onChange(evt);
                setUserInfo({ ...userInfo, dateOfBirth: evt.target.value })
              }}
              onBlur={(evt) => dateOfBirth.onBlurPut(userId, userInfo)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="otherInfo"
              label="Дополнительная информация"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 250,
              }}
              disabled={allDisabled}
              onChange={(evt) => {
                otherInfo.onChange(evt);
                setUserInfo({ ...userInfo, otherInfo: evt.target.value })
              }}
              onBlur={(evt) => otherInfo.onBlurPut(userId, userInfo)}
            />
          </Grid>
        </Grid>
        { allDisabled && <LinearProgress /> }
      </div>
    </>
  );
}
