import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { userCreate } from "@redux/users";
import { parseErrors } from "@utils/parse";
import { useInput, isEmail, minLength, isNotEmpty } from "@validation";
import { useMySnackbar } from "@utils/hooks";
import { getTrackByIdSelector } from "@redux/tracks/selectors";
import CenteredPaper from "@components/CenteredPaper";
import NotFoundPage from "@components/NotFoundPage";
import RenderFetch from "@components/RenderFetch";
import EntityRenderFetch from "@components/RenderFetch/EntityRenderFetch";
import { getAllTracks } from "@redux/tracks";
import { withEntityRenderFetch } from "@components/RenderFetch/EntityRenderFetch/EntityRenderFetch";
import SingleEditableField from "@components/SingleEditableField";

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
  const track = useSelector((state) =>
    getTrackByIdSelector(state, { trackId: entityId })
  );
  if (!track?.id) {
    return <NotFoundPage />;
  }
  const { trackName } = track;
  return (
    <CenteredPaper>
      <SingleEditableField
        initialValue={trackName}
        initialEdit={true}
        fullWidth={true}
      />
      meow meow meow
    </CenteredPaper>
  );
};

export default withEntityRenderFetch(Track, "trackId", getAllTracks);
