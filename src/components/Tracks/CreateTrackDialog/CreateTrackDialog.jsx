import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {
  isNotEmpty,
  useInput,
  escapedMaxLength,
} from "@validation/formValidation";
import SampleFormDialog from "@components/SampleFormDialog";
import { createNewTrack } from "@redux/tracks";
import { useMySnackbar } from "@utils";

const CreateTrackDialog = ({ open, onCancel, onSubmitted }) => {
  const name = useInput("", isNotEmpty(), escapedMaxLength());
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

  const blockUpload = name.isError;

  return (
    <SampleFormDialog
      open={open}
      onClose={onCancel}
      onSubmit={() => handleSubmit(name.value)}
      title="Добавить номинацию"
      uploading={uploading}
      blockUpload={blockUpload}
    >
      <TextField
        required
        id="trackName"
        name="trackName"
        label="Название номинации"
        fullWidth
        inputProps={{
          maxLength: 250,
        }}
        value={name.value}
        error={name.isDirty && name.isError}
        helperText={name.defaultError}
        onBlur={(evt) => name.onBlur(evt)}
        onChange={(evt) => {
          name.onChange(evt);
        }}
      />
    </SampleFormDialog>
  );
};

export default CreateTrackDialog;
