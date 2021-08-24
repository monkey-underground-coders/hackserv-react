import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { useMySnackbar, useParamSelector } from "@utils/hooks";
import { getSelfUserSelector, getUsersByIdsSelector, isSelfAdmin } from "@redux/users";
import {
  putTeam,
  getTeamById,
  getTeamByIdSelector,
  submitTeam,
  deleteTeam,
  approveTeam,
} from "@redux/teams";
import { withEntityRenderFetch } from "@components/RenderFetch/EntityRenderFetch";
import { makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import CaptainView from "./TeamVariableView/CaptainView"
import AdminView from './TeamVariableView/AdminView';
import MemberView from './TeamVariableView/MemberView';

const useStyles = makeStyles((theme) => ({
  button: {
    width: "max-content",
    margin: "auto",
    marginTop: "48px",
  },
}));

const Team = ({ teamId }) => {
  const dispatch = useDispatch();
  const team = useParamSelector(getTeamByIdSelector, { id: teamId });
  const teamMembers = team?.members ?? [];
  const selfUser = useSelector(getSelfUserSelector);
  const isAdmin = useSelector(isSelfAdmin);
  const isUserInTeam = teamMembers.includes(selfUser.id);
  const { enqueueError } = useMySnackbar();
  const captainId = team?.captain;
  const isCaptain = captainId === selfUser.id;
  const teamName = team?.name;
  const track = team?.track;
  const classes = useStyles();
  const selfStatus = selfUser.userState;
  const membersAsUsers = useParamSelector(getUsersByIdsSelector, {ids: teamMembers});
  const isTeamSubmittable = membersAsUsers.reduce((prevState, user) => user.userState === 'FILLED_FORM' && prevState, true);
  const history = useHistory();

  const handleTeamNameChange = (teamName) =>
    dispatch(putTeam({ teamId, teamName, track }))
      .then(unwrapResult)
      .catch(enqueueError);

  const handleSubmitTeam = () =>
    dispatch(submitTeam({ teamId })).then(unwrapResult).catch(enqueueError);

  const handleDeleteTeam = () => 
    dispatch(deleteTeam({ teamId })).then(unwrapResult).then(() => history.push("/dashboard/")).catch(enqueueError);
  
  const handleApproveTeam = () => 
    dispatch(approveTeam({ teamId })).then(unwrapResult).catch(enqueueError);

  return (
    <>
    {isAdmin && <AdminView
      teamId={teamId}
      classes={classes}
      team={team}
      teamMembers={teamMembers}
      teamStatus={membersAsUsers[0].status}
      handleTeamNameChange={handleTeamNameChange}
      handleDeleteTeam={handleDeleteTeam}
      handleApproveTeam={handleApproveTeam}
      isTeamSubmittable={isTeamSubmittable}
    />}
    {isCaptain && !isAdmin && <CaptainView
      teamId={teamId}
      classes={classes}
      team={team}
      teamMembers={teamMembers}
      selfStatus={selfStatus}
      isTeamSubmittable={isTeamSubmittable}
      handleTeamNameChange={handleTeamNameChange}
      handleDeleteTeam={handleDeleteTeam}
      handleSubmitTeam={handleSubmitTeam}
    />}
    {!isCaptain && !isAdmin && <MemberView
      teamId={teamId}
      classes={classes}
      team={team}
      teamMembers={teamMembers}
      selfStatus={selfStatus}
      isTeamSubmittable={isTeamSubmittable}
    />}
    </>
  );
};

export default withEntityRenderFetch(Team, "teamId", getTeamById);
