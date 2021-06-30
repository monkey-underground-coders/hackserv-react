import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import SampleFormDialog from "@components/SampleFormDialog";
import { createNewTrack } from "@redux/tracks";
import { useMySnackbar } from "@utils";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

const CreateTrackDialog = ({ open, onCancel, onSubmitted }) => {
  const [uploading, setUploading] = useState(false);
  const { enqueueError } = useMySnackbar();

  const dispatch = useDispatch();

  const handleSubmit = (name) => {
    if (uploading) return;
    setUploading(true);
    dispatch(createNewTrack({ name }))
      .then(unwrapResult)
      .then(onSubmitted)
      .catch(() => enqueueError("Не удалось создать номинацию"))
      .finally(() => setUploading(false));
  };

  return (
    <SampleFormDialog
      open={open}
      onClose={onCancel}
      onSubmit={(values, bag) => handleSubmit(values.trackName)}
      title="Добавить номинацию"
      uploading={uploading}
    >
      <Field
        component={TextField}
        name="trackName"
        label="Название номинации"
        fullWidth
        required
      />
    </SampleFormDialog>
  );
};

export default CreateTrackDialog;
