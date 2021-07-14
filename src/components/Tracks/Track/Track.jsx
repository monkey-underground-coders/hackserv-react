import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { userCreate } from "@redux/users";
import { parseErrors } from "@utils/parse";
import { useInput, isEmail, minLength, isNotEmpty } from "@validation";
import { useMySnackbar, useParamSelector } from "@utils/hooks";
import { getTrackByIdSelector } from "@redux/tracks/selectors";
import CenteredPaper from "@components/CenteredPaper";
import NotFoundPage from "@components/NotFoundPage";
import RenderFetch from "@components/RenderFetch";
import EntityRenderFetch from "@components/RenderFetch/EntityRenderFetch";
import { getAllTracks, putTrack } from "@redux/tracks";
import { withEntityRenderFetch } from "@components/RenderFetch/EntityRenderFetch/EntityRenderFetch";
import SingleEditableField from "@components/SingleEditableField";
import { unwrapResult } from "@reduxjs/toolkit";
import CriteriaList from "./CriteriaList";
import { titleSchema } from "@schemas/track";

const useStyles = makeStyles((theme) => ({
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  avatarLogo: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkDecor: {
    color: theme.palette.primary.main,
  },
}));

const Track = ({ entityId, editAllowed }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();

  const track = useParamSelector(getTrackByIdSelector, { trackId: entityId });

  if (!track?.id) {
    return <NotFoundPage />;
  }
  const { trackName, criteriaList: criteriaIdsList } = track;

  const handleTrackNameChange = (value) =>
    dispatch(putTrack({ trackId: entityId, trackName: value }))
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
          validationSchema={titleSchema}
          fullWidth
        />
      </CenteredPaper>
      <CenteredPaper>
        <CriteriaList
          criteriaIdsList={criteriaIdsList}
          editAllowed={editAllowed}
        />
      </CenteredPaper>
    </>
  );
};

export default withEntityRenderFetch(Track, "trackId", getAllTracks);
