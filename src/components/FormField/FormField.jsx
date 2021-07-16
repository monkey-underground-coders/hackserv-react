import React from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

const FormField = ({
  edit,
  editComponent: EditComponent = TextField,
  children,
  ...editProps
}) => {
  if (edit) {
    return <Field component={EditComponent} {...editProps} />;
  } else {
    return children;
  }
};

export default FormField;
