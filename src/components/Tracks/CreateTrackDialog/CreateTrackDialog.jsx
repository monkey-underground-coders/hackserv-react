import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import SampleFormDialog from "@components/SampleFormDialog";
import { createNewTrack } from "@redux/tracks";
import { useMySnackbar } from "@utils";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

const CreateTrackDialog = ({ open, onCancel, onSubmitted }) => {
  const { enqueueError } = useMySnackbar();

  const dispatch = useDispatch();

  const handleSubmit = (name) =>
    dispatch(createNewTrack({ name }))
      .then(unwrapResult)
      .then(onSubmitted)
      .catch((e) => {
        console.error(e);
        enqueueError("Не удалось создать номинацию");
      });

  return (
    <SampleFormDialog
      initialValues={{ trackName: "" }}
      open={open}
      onClose={onCancel}
      onSubmit={(values, bag) => handleSubmit(values.trackName)}
      title="Добавить номинацию"
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
