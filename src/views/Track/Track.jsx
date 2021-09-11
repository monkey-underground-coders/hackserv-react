import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  useMySnackbar,
  useParamSelector,
  useEntityLoading,
} from "@utils/hooks";
import { getTrackByIdSelector } from "@redux/tracks/selectors";
import CenteredPaper from "@components/CenteredPaper";
import { getTrackById, putTrack } from "@redux/tracks";
import SingleEditableField from "@components/SingleEditableField";
import CriteriaList from "./CriteriaList";
import { titleSchemaTrack } from "@validation/yup/track";
import TeamsList from "@components/TeamsList";
import { isSelfAdminSelector } from "@redux/users";
import LoadingAndError from "@components/LoadingAndError";

const Track = () => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const admin = useSelector(isSelfAdminSelector);
  const { bundle, value, trackId } = useEntityLoading("trackId", getTrackById);

  const track = useParamSelector(getTrackByIdSelector, { trackId }) ?? {};

  console.log(bundle, track, value);

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
    <LoadingAndError bundle={bundle}>
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
    </LoadingAndError>
  );
};

export default Track;
