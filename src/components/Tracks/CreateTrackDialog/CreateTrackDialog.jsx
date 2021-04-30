import { TextField } from "@material-ui/core";
import React, { useState } from "react";

import {
  isNotEmpty,
  useInput,
  escapedMaxLength,
} from "@validation/formValidation";
import SampleFormDialog from "@components/SampleFormDialog";
import { useDispatch } from "react-redux";

const CreateTrackDialog = ({ open, onCancel, onSubmitted }) => {
  const name = useInput("", isNotEmpty(), escapedMaxLength());
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (trackName) => {
    setUploading(true);
    alert("типо загрузил");
    setUploading(false);
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
