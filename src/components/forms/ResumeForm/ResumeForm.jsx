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
import clsx from "clsx";

import { maxFileSizeSelector } from "@redux/conf";
import { userUploadResume, userDeleteResume } from "@redux/users";

const useStyles = makeStyles(() => ({
  formButton: {
    alignItems: "center",
    display: "flex",
  },
}));

const ResumeForm = ({ user, allowUpload = true }) => {
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
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
    return dispatch(userDeleteResume({ userId }))
      .then(unwrapResult)
      .then(() => {
        enqueueSnackbar(`Резюме успешно удалено`, {
          variant: "info",
        });
      })
      .catch(() => {
        enqueueSnackbar(`Не удалось удалить резюме`, {
          variant: "error",
        });
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
            <Grid item>
              <IconButton onClick={deleteResume}>
                <DeleteForever />
              </IconButton>
            </Grid>
          )}
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
