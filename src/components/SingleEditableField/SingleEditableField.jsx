import Title from "@components/Title";
import { makeStyles } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";

import { useMySnackbar } from "@utils/hooks";
import FormikFormControls from "@components/FormControls/FormikFormControls";

const useStyles = makeStyles((theme) => ({
  // @ts-ignore
  container: ({ edit }) => ({
    display: "flex",
    flexDirection: "row",
    width: !edit ? "100%" : undefined,
    alignItems: "flex-start",
  }),
}));

const SingleEditableField = ({
  onSubmit = null,
  initialValue = "",
  initialEdit = false,
  normalComponent: NormalComponent = Title,
  normalComponentProps = {},
  validationSchema,
  editProps = {},
  name = "field",
  fullWidth = true,
  disableEdit = false,
}) => {
  const [edit, setEdit] = useState(initialEdit);

  const classes = useStyles({ edit });
  const { enqueueError, enqueueInfo } = useMySnackbar();

  const $onSubmit = onSubmit ?? ((v) => enqueueInfo(`Got '${v}'`));

  const handleSubmit = (values, bag) => {
    const value = values[name];
    if (value !== initialValue) {
      console.log(value, initialValue);
      return Promise.resolve($onSubmit(value, bag))
        .then(() => setEdit(false))
        .catch(enqueueError);
    } else {
      return Promise.resolve(setEdit(false));
    }
  };

  const handleEditButtonClick = () => setEdit(true);

  if (disableEdit) {
    return (
      <NormalComponent {...normalComponentProps}>
        {initialValue}
      </NormalComponent>
    );
  } else {
    return (
      <Formik
        initialValues={{ [name]: initialValue }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className={classes.container}>
          {edit ? (
            <Field
              component={TextField}
              name={name}
              fullWidth={fullWidth}
              {...editProps}
            />
          ) : (
            <NormalComponent {...normalComponentProps}>
              {initialValue}
            </NormalComponent>
          )}
          <FormikFormControls edit={edit} onEdit={handleEditButtonClick} />
        </Form>
      </Formik>
    );
  }
};

export default SingleEditableField;
