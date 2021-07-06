import React from "react";
import { useSelector } from "react-redux";
import { ListItem, ListItemText } from "@material-ui/core";

import { getTrackByIdSelector } from "@redux/tracks";
import { Link, useRouteMatch } from "react-router-dom";

const TrackListItem = ({ trackId, editAllowed }) => {
  const track = useSelector((state) =>
    getTrackByIdSelector(state, { trackId })
  );
  const match = useRouteMatch();
  return (
    <ListItem button component={Link} to={`${match.url}/${trackId}`}>
      <ListItemText primary={track.trackName} />
    </ListItem>
  );
};

export default TrackListItem;
