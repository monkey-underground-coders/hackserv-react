import React from "react";
import { Fab, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cornerFab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const CornerFab = ({ onClick, size = "large", children }) => {
  const classes = useStyles();

  return (
    <Fab
      color="primary"
      aria-label="add"
      className={classes.cornerFab}
      onClick={onClick}
      size={size}
    >
      {children}
    </Fab>
  );
};

export default CornerFab;
