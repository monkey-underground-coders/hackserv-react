import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DropzoneDialog } from "material-ui-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";
import { Divider, IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import clsx from "clsx";

import { maxFileSizeSelector } from "@redux/conf";
import {
  userUploadResume,
  userDeleteResume,
  getSelfUserSelector,
} from "@redux/users";
import { userIdSelector } from "@redux/auth/selectors";
import { getSelf } from "../../../redux/users";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formButton: {
    alignItems: "center",
    display: "flex",
  },
}));

const userInfo = {
  firstName: "",
  lastName: "",
  middleName: "",
  university: "",
  telegram: "",
  dateOfBirth: "2021-04-01",
  other: "",
}

const errors = {
  telegramError: false,
  dateOfBirthError: false,
}

export default function UserInfoForm() {
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [user, setUser] = useState(userInfo);
  const [error, setError] = useState(errors);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const maxFileSize = useSelector(maxFileSizeSelector);
  const currentUser = useSelector(getSelfUserSelector);
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const onFUSave = (files) => {
    const file = files[0];
    return dispatch(userUploadResume({ file, userId }))
      .then(unwrapResult)
      .then(() => {
        setFileUploadDialogOpen(false);
        enqueueSnackbar(`Файл ${file.name} успешно загружен!`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar(`Не удалось загрузить файл ${file.name}`, {
          variant: "error",
        });
      });
  };

  const onFUClose = () => {
    setFileUploadDialogOpen(false);
  };

  const onFUAlert = (message, variant) => {
    if (variant !== "error") return;
    enqueueSnackbar(message, { variant });
  };

  const deleteResume = () => {
    return dispatch(userDeleteResume({ userId })).then(() =>
      dispatch(getSelf())
    );
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Заполните данные о себе:
      </Typography>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Фамилия"
              fullWidth
              autoComplete="family-name"
              inputProps={{
                maxLength: 250,
              }}
              onChange={(evt) => {
                setUser({...user, lastName: evt.target.value});
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Имя"
              fullWidth
              autoComplete="given-name"
              inputProps={{
                maxLength: 250,
              }}
              onChange={(evt) => {
                setUser({...user, firstName: evt.target.value});
              }}
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
              onChange={(evt) => {
                setUser({...user, middleName: evt.target.value});
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="university"
              name="university"
              label="Университет/Школа/Место работы"
              fullWidth
              autoComplete="off"
              inputProps={{
                maxLength: 250,
              }}
              onChange={(evt) => {
                setUser({...user, university: evt.target.value});
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error = {error.telegramError}
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
              onChange={(evt) => {
                const reg = /^@(?=\w{5,64}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/;
                if (reg.test(evt.target.value)) {
                  setUser({...user, telegram: evt.target.value});
                  setError({...error, telegramError: false});
                }
                else {
                  setError({...error, telegramError: true});
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.dateOfBirthError}
              required
              id="date"
              label="Дата рождения"
              type="date"
              defaultValue="2021-04-01"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(evt) => {
                if (Date.now() < new Date(evt.target.value)) {
                  setError({...error, dateOfBirthError: true});
                }
                else {
                  setError({...error, dateOfBirthError: false});
                  setUser({...user, dateOfBirth: evt.target.value});
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="other"
              label="Дополнительная информация"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 250,
              }}
              onChange={(evt) => {
                setUser({...user, other: evt.target.value});
              }}
            />
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" flexItem />
      <div>
        <Grid container spacing={3}>
          <Grid item className={clsx(classes.formButton)}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setFileUploadDialogOpen(true)}
            >
              Загрузить резюме
            </Button>
          </Grid>

          {currentUser.documentResumePath && (
            <Grid item>
              <IconButton onClick={deleteResume}>
                <DeleteForever />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </div>
      <DropzoneDialog
        open={fileUploadDialogOpen}
        onSave={onFUSave}
        acceptedFiles={[
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
          "application/pdf", // .pdf
        ]}
        showPreviews={true}
        onAlert={onFUAlert}
        showAlerts={false}
        maxFileSize={maxFileSize}
        onClose={onFUClose}
        filesLimit={1}
        dialogTitle={"Загрузка резюме"}
        cancelButtonText={"Отмена"}
        submitButtonText={"Отправить"}
        dropzoneText={"Переместите файл в область или нажмите сюда"}
      />
    </>
  );
}
