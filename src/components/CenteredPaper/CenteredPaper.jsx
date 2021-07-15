import React from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import Title from "@components/Title";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const CenteredPaper = ({ title = "", children }) => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        {title && <Title>{title}</Title>}
        {children}
      </Paper>
    </div>
  );
};

export default CenteredPaper;
