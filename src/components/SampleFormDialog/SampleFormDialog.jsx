import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { Formik } from "formik";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
const SampleFormDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  contextText,
  children,
  validationSchema,
  initialValues,
}) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues || {}}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <form onSubmit={handleSubmit}>
          <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
              {contextText && (
                <DialogContentText>{contextText}</DialogContentText>
              )}
              {children}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={onClose}
                color="primary"
                disabled={isSubmitting || false}
              >
                Отменить
              </Button>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting || !isValid || false}
                >
                  Отправить
                </Button>
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </DialogActions>
          </Dialog>
        </form>
      )}
    </Formik>
  );
};

export default SampleFormDialog;
