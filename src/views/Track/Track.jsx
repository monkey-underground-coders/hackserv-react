import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { useMySnackbar, useParamSelector } from "@utils/hooks";
import { getTrackByIdSelector } from "@redux/tracks/selectors";
import CenteredPaper from "@components/CenteredPaper";
import NotFoundPage from "@components/NotFoundPage";
import { getTrackById, putTrack } from "@redux/tracks";
import { withEntityRenderFetch } from "@components/RenderFetch/EntityRenderFetch/EntityRenderFetch";
import SingleEditableField from "@components/SingleEditableField";
import CriteriaList from "./CriteriaList";
import { titleSchemaTrack } from "@validation/yup/track";
import TeamsList from "@components/TeamsList";
import { isSelfAdmin } from "@redux/users";

const Track = ({ trackId }) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const admin = useSelector(isSelfAdmin);

  const track = useParamSelector(getTrackByIdSelector, { trackId });

  if (!track?.id) {
    return <NotFoundPage />;
  }
  const {
    trackName,
    criteriaList: criteriaIdsList,
    teams: teamIdsList,
  } = track;

  const handleTrackNameChange = (value) =>
    dispatch(putTrack({ trackId, trackName: value }))
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
          disableEdit={!admin}
          fullWidth
        />
      </CenteredPaper>
      <CenteredPaper>
        <CriteriaList
          trackId={trackId}
          criteriaIdsList={criteriaIdsList}
          editAllowed={admin}
        />
      </CenteredPaper>
      {admin && (
        <CenteredPaper title="Команды" secondary>
          <TeamsList ids={teamIdsList} />
        </CenteredPaper>
      )}
    </>
  );
};

export default withEntityRenderFetch(Track, "trackId", getTrackById);