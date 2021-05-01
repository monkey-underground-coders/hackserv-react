import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";

import Track from "./Track";
import { getAllTrackIdsSelector, getAllTracks } from "@redux/tracks";
import { isSelfAdmin } from "@redux/users";
import { useMySnackbar } from "@utils/hooks";
import PaperList from "@components/PaperList";
import CreateTrackDialog from "./CreateTrackDialog";

const Tracks = ({ globalAppend = true }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueError } = useMySnackbar();

  const tracks = useSelector(getAllTrackIdsSelector);
  const dispatch = useDispatch();
  const allowEdit = useSelector(isSelfAdmin);

  const handleGetTracks = () => {
    return dispatch(getAllTracks())
      .then(unwrapResult)
      .catch(() => enqueueError("Не удалось загрузить номинации"));
  };

  const handleAppendClick = () => {
    setDialogOpen(true);
  };

  const handleAppendClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <PaperList
        title={"Номинации"}
        isEmpty={!tracks.length}
        appendAllowed={allowEdit}
        onGetAllItems={handleGetTracks}
        onAppendClick={handleAppendClick}
        globalAppend={globalAppend}
      >
        {tracks.map((t) => (
          <div key={t}>
            <Track trackId={t} editAllowed={allowEdit} />
            <Divider />
          </div>
        ))}
      </PaperList>
      {allowEdit && (
        <CreateTrackDialog
          open={dialogOpen}
          onCancel={handleAppendClose}
          onSubmitted={() => {
            setDialogOpen(false);
            handleGetTracks();
          }}
        />
      )}
    </>
  );
};

export default Tracks;
