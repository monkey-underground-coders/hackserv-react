import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import AddIcon from "@material-ui/icons/Add";

import TrackListItem from "./TrackListItem";
import { getAllTrackIdsSelector, getAllTracks } from "@redux/tracks";
import { useMySnackbar } from "@utils/hooks";
import CreateTrackDialog from "./CreateTrackDialog";
import { isSelfAdmin } from "@redux/users";
import CenteredPaper from "@components/CenteredPaper";
import ContentList from "@components/ContentList";
import CornerFab from "@components/CornerFab";
import { withReduxRenderFetch } from "@components/RenderFetch/ReduxRenderFetch/ReduxRenderFetch";

const Tracks = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueError } = useMySnackbar();

  const tracks = useSelector(getAllTrackIdsSelector);
  const dispatch = useDispatch();
  const allowEdit = useSelector(isSelfAdmin);

  const handleGetTracks = () =>
    dispatch(getAllTracks())
      .then(unwrapResult)
      .catch(() => enqueueError("Не удалось загрузить номинации"));

  const handleAppendClick = () => setDialogOpen(true);

  const handleAppendClose = () => setDialogOpen(false);

  return (
    <CenteredPaper title="Номинации">
      <ContentList content={tracks} dividers>
        {(t) => <TrackListItem trackId={t} editAllowed={allowEdit} />}
      </ContentList>
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
      {allowEdit && (
        <CornerFab onClick={handleAppendClick}>
          <AddIcon />
        </CornerFab>
      )}
    </CenteredPaper>
  );
};

export default withReduxRenderFetch(Tracks, getAllTracks);
