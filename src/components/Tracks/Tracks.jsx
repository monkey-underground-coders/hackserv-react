import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import TrackListItem from "./TrackListItem";
import { getAllTrackIdsSelector, getAllTracks } from "@redux/tracks";
import { useMySnackbar } from "@utils/hooks";
import PaperList from "@components/PaperList";
import CreateTrackDialog from "./CreateTrackDialog";
import Track from "./Track/Track";
import { isSelfAdmin } from "@redux/users";

const Tracks = ({ globalAppend = true }) => {
  const match = useRouteMatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueError } = useMySnackbar();

  const tracks = useSelector(getAllTrackIdsSelector);
  const dispatch = useDispatch();
  const allowEdit = useSelector(isSelfAdmin);
  // const allowEdit = false;

  const handleGetTracks = () =>
    dispatch(getAllTracks())
      .then(unwrapResult)
      .catch(() => enqueueError("Не удалось загрузить номинации"));

  const handleAppendClick = () => setDialogOpen(true);

  const handleAppendClose = () => setDialogOpen(false);

  return (
    <Switch>
      <Route path={`${match.path}/:trackId`}>
        <Track editAllowed={allowEdit} showTeams={allowEdit} />
      </Route>
      <Route path={`${match.path}`}>
        <PaperList
          title="Номинации"
          isEmpty={!tracks.length}
          appendAllowed={allowEdit}
          onGetAllItems={handleGetTracks}
          onAppendClick={handleAppendClick}
          globalAppend={globalAppend}
        >
          {tracks.map((t, index) => (
            <React.Fragment key={t}>
              {index !== 0 && <Divider />}
              <TrackListItem trackId={t} editAllowed={allowEdit} />
            </React.Fragment>
          ))}
        </PaperList>
        {allowEdit && (
          <CreateTrackDialog
            open={dialogOpen}
            onCancel={handleAppendClose}
            onSubmitted={() => {
              setDialogOpen(false);
              return handleGetTracks();
            }}
          />
        )}
      </Route>
    </Switch>
  );
};

export default Tracks;
