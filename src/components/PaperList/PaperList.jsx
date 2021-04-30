import { CircularProgress, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Title from "@components/Title/Title";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  cornerFab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const PaperList = ({
  title,
  isEmpty,
  appendAllowed,
  onGetAllItems,
  onAppendClick,
  children,
}) => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      onGetAllItems().then(() => setRefresh(false));
    }
  }, [refresh, onGetAllItems]);

  let content;
  if (!refresh && !isEmpty) {
    content = <List>{children}</List>;
  } else if (!refresh && isEmpty) {
    content = "Список пуст";
  } else {
    content = <CircularProgress />;
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Title>{title}</Title>
        {content}
      </Paper>

      {appendAllowed && (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.cornerFab}
          onClick={onAppendClick}
        >
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

export default PaperList;
