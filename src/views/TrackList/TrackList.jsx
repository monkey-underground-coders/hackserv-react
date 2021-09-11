import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";

import TrackListItem from "./TrackListItem";
import { getAllTrackIdsSelector, getAllTracks } from "@redux/tracks";
import { useLoading } from "@utils/hooks";
import CreateTrackDialog from "./CreateTrackDialog";
import { isSelfAdminSelector } from "@redux/users";
import CenteredPaper from "@components/CenteredPaper";
import ContentList from "@components/ContentList";
import CornerFab from "@components/CornerFab";
import LoadingAndError from "@components/LoadingAndError";

const errorToMsg = () => "Не удалось загрузить номинации";

const Tracks = () => {
  const { execute, bundle } = useLoading(getAllTracks, {
    errorToMsg,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const tracks = useSelector(getAllTrackIdsSelector);
  const allowEdit = useSelector(isSelfAdminSelector);

  const handleGetTracks = () => execute();

  const handleAppendClick = () => setDialogOpen(true);

  const handleAppendClose = () => setDialogOpen(false);

  return (
    <LoadingAndError bundle={bundle}>
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
          <CornerFab size="large" onClick={handleAppendClick}>
            <AddIcon />
          </CornerFab>
        )}
      </CenteredPaper>
    </LoadingAndError>
  );
};

export default Tracks;
