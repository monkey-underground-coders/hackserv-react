import { CircularProgress, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "@components/Title/Title";
import Track from "./Track";
import { getAllTrackIdsSelector, getAllTracks } from "@redux/tracks";
import { unwrapResult } from "@reduxjs/toolkit";
import { useMySnackbar } from "@utils/hooks";

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
}));

const Tracks = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(true);
  const { enqueueError } = useMySnackbar();

  const tracks = useSelector(getAllTrackIdsSelector);
  const dispatch = useDispatch();

  const handleGetTracks = () => {
    return dispatch(getAllTracks())
      .then(unwrapResult)
      .catch(() => enqueueError("Не удалось загрузить номинации"));
  };

  useEffect(() => {
    if (refresh) {
      handleGetTracks().then(() => setRefresh(false));
    }
  }, [refresh]);

  let content;
  if (!refresh && tracks.length) {
    content = (
      <List>
        {tracks.map((t) => (
          <Track key={t} trackId={t} editAllowed={true} />
        ))}
      </List>
    );
  } else if (!refresh && !tracks.length) {
    content = "Номинаций на данный момент нет";
  } else {
    content = <CircularProgress />;
  }

  return (
    <Paper className={classes.paper}>
      <Title>Номинации</Title>
      {content}
    </Paper>
  );
};

export default Tracks;
