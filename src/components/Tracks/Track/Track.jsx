import React from "react";
import { useSelector } from "react-redux";
import { ListItem, ListItemText } from "@material-ui/core";

import { getTrackByIdSelector } from "@redux/tracks/selectors";

const Track = ({ trackId, editAllowed }) => {
  const track = useSelector((state) => getTrackByIdSelector(state, trackId));

  return (
    <ListItem>
      <ListItemText primary={track.trackName} />
    </ListItem>
  );
};

export default Track;
