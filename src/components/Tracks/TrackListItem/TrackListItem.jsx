import React from "react";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { deleteTrack, getTrackByIdSelector } from "@redux/tracks";
import { useParamSelector } from "@utils";
import ActionButton from "@components/ActionButton";

const TrackListItem = ({ trackId, editAllowed }) => {
  const match = useRouteMatch();

  const track = useParamSelector(getTrackByIdSelector, { trackId });

  return (
    <ListItem button component={Link} to={`${match.url}/${trackId}`}>
      <ListItemText primary={track.trackName} />
      {editAllowed && (
        <ListItemSecondaryAction>
          <ActionButton
            // @ts-ignore
            action={deleteTrack({ trackId })}
            errorMessage="Не удалось удалить номинацию"
          >
            <DeleteForeverIcon />
          </ActionButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default TrackListItem;
