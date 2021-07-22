import React from "react";
import { useFormikContext } from "formik";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  wrapper: ({ fullWidth }) => ({
    margin: theme.spacing(1),
    position: "relative",
    width: fullWidth && "100%",
  }),
  buttonProgress: {
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
  ...rest
}) => {
  const classes = useStyles({ fullWidth: rest.fullWidth || false });
  const { isSubmitting, isValid } = useFormikContext();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Component type="submit" disabled={!isValid || isSubmitting} {...rest}>
          {children}
        </Component>
        {isSubmitting && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};

export default FormikFormControls;
