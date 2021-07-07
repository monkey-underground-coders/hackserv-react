import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typography: {
    width: "100%",
  },
}));

const Title = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography
      component="h2"
      variant="h4"
      color="primary"
      gutterBottom
      className={classes.typography}
    >
      {children}
    </Typography>
  );
};

export default Title;
