import React from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { useMySnackbar, useParamSelector } from "@utils/hooks";
import { getTrackByIdSelector } from "@redux/tracks/selectors";
import CenteredPaper from "@components/CenteredPaper";
import NotFoundPage from "@components/NotFoundPage";
import { getAllTracks, putTrack } from "@redux/tracks";
import { withEntityRenderFetch } from "@components/RenderFetch/EntityRenderFetch/EntityRenderFetch";
import SingleEditableField from "@components/SingleEditableField";
import CriteriaList from "./CriteriaList";
import { titleSchemaTrack } from "@schemas/track";

const Track = ({ trackId, editAllowed }) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();

  const track = useParamSelector(getTrackByIdSelector, { trackId });

  if (!track?.id) {
    return <NotFoundPage />;
  }
  const { trackName, criteriaList: criteriaIdsList } = track;

  const handleTrackNameChange = (value) =>
    // @ts-ignore
    dispatch(putTrack({ trackId, trackName: value }))
      // @ts-ignore
      .then(unwrapResult)
      .catch(enqueueError);

  return (
    <>
      <CenteredPaper>
        <SingleEditableField
          initialValue={trackName}
          onSubmit={handleTrackNameChange}
          normalComponentProps={{
            gutterBottom: false,
          }}
          name="trackName"
          validationSchema={titleSchemaTrack}
          disableEdit={!editAllowed}
          fullWidth
        />
      </CenteredPaper>
      <CenteredPaper>
        <CriteriaList
          trackId={trackId}
          criteriaIdsList={criteriaIdsList}
          editAllowed={editAllowed}
        />
      </CenteredPaper>
    </>
  );
};

export default withEntityRenderFetch(Track, "trackId", getAllTracks);
