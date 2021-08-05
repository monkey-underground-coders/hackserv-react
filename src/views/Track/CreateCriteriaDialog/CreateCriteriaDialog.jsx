import React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { useDispatch } from "react-redux";

import { createNewCriteria } from "@redux/voteCriteria";
import { basicCriteriaInfo } from "@validation/yup/criteria";
import { useMySnackbar } from "@utils/hooks";
import SampleFormDialog from "@components/SampleFormDialog";

const CreateCriteriaDialog = ({ trackId, open, onCancel, onSubmitted }) => {
  const { enqueueError } = useMySnackbar();

  const dispatch = useDispatch();

  const handleSubmit = ({ name, maxValue }, bag) =>
    dispatch(createNewCriteria({ trackId, name, maxValue }))
      .then(unwrapResult)
      .then(onSubmitted)
      .catch((e) => {
        console.error(e);
        enqueueError("Не удалось создать номинацию");
      });

  return (
    <SampleFormDialog
      initialValues={{ name: "", maxValue: 10 }}
      open={open}
      onClose={onCancel}
      onSubmit={handleSubmit}
      title="Добавить критерий"
      validationSchema={basicCriteriaInfo}
    >
      <Field
        component={TextField}
        name="name"
        label="Название критерия"
        fullWidth
        required
      />
      <Field
        component={TextField}
        name="maxValue"
        label="Максимальное количество баллов"
        type="number"
        fullWidth
        required
      />
    </SampleFormDialog>
  );
};

export default CreateCriteriaDialog;
