import React from "react";
import { useFormikContext } from "formik";
import FormControls from "../FormControls";

const FormikFormControls = ({ edit, onEdit, ...rest }) => {
  const { isSubmitting, isValid, dirty } = useFormikContext();

  return (
    <FormControls
      edit={edit}
      isDirty={dirty}
      onEdit={onEdit}
      isSubmitting={isSubmitting}
      isValid={isValid}
      {...rest}
    />
  );
};

export default FormikFormControls;
