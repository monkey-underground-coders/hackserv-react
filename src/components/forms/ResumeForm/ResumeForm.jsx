import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { DropzoneDialog } from "material-ui-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import GetAppIcon from "@material-ui/icons/GetApp";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import fileDownload from "js-file-download";
import clsx from "clsx";

import { maxFileSizeSelector } from "@redux/conf";
import { userUploadResume, userDeleteResume } from "@redux/users";
import { getResume } from "@api";
import { generateResumeFilename } from "@utils/parse";
import { useMySnackbar } from "@utils/hooks";

const useStyles = makeStyles(() => ({
  formButton: {
    alignItems: "center",
    display: "flex",
  },
}));

const ResumeForm = ({ user, allowUpload = true }) => {
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    enqueueInfo,
    enqueueSuccess,
    enqueueError,
    enqueueSnackbar,
  } = useMySnackbar();

  const classes = useStyles();

  const maxFileSize = useSelector(maxFileSizeSelector);
  const dispatch = useDispatch();

  const userId = user.id;

  const onFUSave = (files) => {
    const file = files[0];
    return dispatch(userUploadResume({ file, userId }))
      .then(unwrapResult)
      .then(() => {
        setFileUploadDialogOpen(false);
        enqueueSuccess(`Файл ${file.name} успешно загружен!`);
      })
      .catch(() => {
        enqueueError(`Не удалось загрузить файл ${file.name}`);
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
    return dispatch(userDeleteResume({ userId }))
      .then(unwrapResult)
      .then(() => {
        enqueueInfo(`Резюме успешно удалено`);
      })
      .catch(() => {
        enqueueError(`Не удалось удалить резюме`);
      });
  };

  const downloadResume = () => {
    if (loading) return;
    setLoading(true);

    return getResume(userId)
      .then((response) =>
        fileDownload(response.data, generateResumeFilename(user))
      )
      .catch(() => {
        enqueueError(`Не удалось скачать резюме`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <Grid container spacing={3}>
          {allowUpload && (
            <Grid item className={clsx(classes.formButton)}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFileUploadDialogOpen(true)}
              >
                Загрузить резюме
              </Button>
            </Grid>
          )}
          {user.documentResumePath && (
            <>
              <Grid item>
                {!loading ? (
                  <IconButton onClick={downloadResume}>
                    <GetAppIcon />
                  </IconButton>
                ) : (
                  <IconButton>
                    <CircularProgress color="inherit" size={24} />
                  </IconButton>
                )}
              </Grid>
              <Grid item>
                <IconButton onClick={deleteResume}>
                  <DeleteForever />
                </IconButton>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              id="other"
              label="Если у вас нет резюме, расскажите о себе в этом поле"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 5000,
              }}
              //   onChange={(evt) => {
              //     setUser({ ...user, other: evt.target.value });
              //   }}
            />
          </Grid>
        </Grid>
      </div>
      {allowUpload && (
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
      )}
    </>
  );
};

export default ResumeForm;
