import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Title from "@components/Title/Title";

const useStyles = makeStyles((theme) => ({
  paper: ({ globalAppend }) => ({
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    position: !globalAppend ? "relative" : undefined,
  }),
  cornerFab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  progress: {
    display: "flex",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
  },
}));

const PaperList = ({
  title,
  isEmpty,
  appendAllowed,
  onGetAllItems = () => Promise.resolve(),
  onAppendClick,
  globalAppend = false,
  children,
}) => {
  const classes = useStyles({ globalAppend });
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
    content = (
      <Typography
        variant="caption"
        display="block"
        className={classes.emptyText}
        gutterBottom
      >
        Список пуст
      </Typography>
    );
  } else {
    content = (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Title>{title}</Title>
      {content}
      {appendAllowed && (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.cornerFab}
          onClick={onAppendClick}
          size={globalAppend ? "large" : "small"}
        >
          <AddIcon />
        </Fab>
      )}
    </Paper>
  );
};

export default PaperList;
