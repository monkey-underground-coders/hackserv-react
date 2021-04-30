import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Track from "./Track";
import { getAllTrackIdsSelector, getAllTracks } from "@redux/tracks";
import { isSelfAdmin } from "@redux/users";
import { unwrapResult } from "@reduxjs/toolkit";
import { useMySnackbar } from "@utils/hooks";
import PaperList from "../PaperList";
import CreateTrackDialog from "./CreateTrackDialog";

const Tracks = () => {
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
      >
        {tracks.map((t) => (
          <Track key={t} trackId={t} editAllowed={allowEdit} />
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
