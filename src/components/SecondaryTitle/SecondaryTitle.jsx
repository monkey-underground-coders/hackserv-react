import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typography: {
    width: "100%",
  },
}));

const SecondaryTitle = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Typography
      component="h3"
      variant="h6"
      color="primary"
      gutterBottom
      className={classes.typography}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default SecondaryTitle;
