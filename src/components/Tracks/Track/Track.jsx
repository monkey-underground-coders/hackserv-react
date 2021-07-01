import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LockIcon from "@material-ui/icons/Lock";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Paper } from "@material-ui/core";

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
    <CenteredPaper title={trackName}>
      <p>
        meowgedrfolnjugdfujilriungsedrfnrwsehntrsweitbneruinbedtfilgbnidsfuhjgbsdeytgnhizsdrugthbidsfpybzdfro
      </p>
    </CenteredPaper>
  );
};

export default withEntityRenderFetch(Track, "trackId", getAllTracks);
