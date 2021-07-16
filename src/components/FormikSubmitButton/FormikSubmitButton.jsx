import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

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
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const FormikFormControls = ({
  component: Component = Button,
  children,
  mainProps = {},
  loadingProps = {},
  ...rest
}) => {
  const classes = useStyles();
  const { isSubmitting, isValid } = useFormikContext();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Component
          type="submit"
          disabled={!isValid || isSubmitting}
          {...mainProps}
          {...rest}
        >
          {children}
        </Component>
        {true && (
          <CircularProgress size="24" className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};

export default FormikFormControls;