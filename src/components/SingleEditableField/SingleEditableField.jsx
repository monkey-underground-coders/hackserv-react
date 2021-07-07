import Title from "@components/Title";
import { CircularProgress, IconButton, makeStyles } from "@material-ui/core";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import { useMySnackbar } from "@utils/hooks";

const useStyles = makeStyles((theme) => ({
  container: ({ edit }) => ({
    display: "flex",
    flexDirection: "row",
    width: !edit ? "100%" : undefined,
    alignItems: "center",
  }),
  editButton: {
    alignSelf: "end",
  },
  button: {
    flexShrink: 0,
  },
  doneButton: {
    transition: "margin-right 0.5s ease-out",
    marginRight: "-48px",
  },
  doneButtonShifted: {
    transition: "margin-right 0.5s ease-out",
  },
  undoButton: {
    transition: "opacity 0.5s ease-out",
  },
  undoButtonHidden: {
    opacity: 0,
    transition: "opacity 0.5s ease-out",
  },
}));

const SingleEditableField = ({
  onSubmit,
  initialValue = "",
  initialEdit = false,
  normalComponent: NormalComponent = Title,
  normalComponentProps,
  validationSchema,
  editProps,
  fullWidth = true,
}) => {
  const [edit, setEdit] = useState(initialEdit);

  const classes = useStyles({ edit });
  const { enqueueError, enqueueInfo } = useMySnackbar();

  const $onSubmit =
    onSubmit === undefined ? (v) => enqueueInfo(`Got '${v}'`) : onSubmit;

  const handleSubmit = (values, bag) => {
    if (values.field !== initialValue) {
      return Promise.resolve($onSubmit(values.field, bag))
        .then(() => setEdit(false))
        .catch(enqueueError);
    } else {
      setEdit(false);
      return Promise.resolve();
    }
  };

  const handleEditButtonClick = () => setEdit(true);

  const handleUndoButtonClick = () => setEdit(false);

  if (edit) {
    return (
      <Formik
        initialValues={{ field: initialValue }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid, initialValues, values }) => {
          const isUndoVisible = initialValues.field !== values.field;

          return (
            <form onSubmit={handleSubmit} className={classes.container}>
              <Field
                component={TextField}
                name="field"
                fullWidth={fullWidth}
                {...editProps}
              />
              {isSubmitting ? (
                <IconButton className={classes.doneButtonShifted}>
                  <CircularProgress size="10" />
                </IconButton>
              ) : (
                <IconButton
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    !isUndoVisible
                      ? classes.doneButton
                      : classes.doneButtonShifted
                  }
                >
                  <DoneIcon />
                </IconButton>
              )}
              <IconButton
                disabled={!isValid}
                onClick={handleUndoButtonClick}
                aria-label="undo"
                className={
                  !isUndoVisible ? classes.undoButtonHidden : classes.undoButton
                }
              >
                <RotateLeftIcon />
              </IconButton>
            </form>
          );
        }}
      </Formik>
    );
  } else {
    return (
      <div className={classes.container}>
        <NormalComponent {...normalComponentProps}>
          {initialValue}
        </NormalComponent>
        <IconButton
          onClick={handleEditButtonClick}
          aria-label="edit"
          className={classes.editButton}
        >
          <EditIcon />
        </IconButton>
      </div>
    );
  }
};

export default SingleEditableField;
