import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { useMySnackbar, useParamSelector } from "@utils/hooks";
import {
  getSelfUserSelector,
  getUsersByIdsSelector,
  isSelfAdmin,
} from "@redux/users";
import {
  putTeam,
  getTeamByIdSelector,
  submitTeam,
  deleteTeam,
  approveTeam,
} from "@redux/teams";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CaptainView from "../TeamVariableView/CaptainView";
import AdminView from "../TeamVariableView/AdminView";
import MemberView from "../TeamVariableView/MemberView";
import NotMemberView from "../TeamVariableView/NotMemberView";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "max-content",
    margin: "auto",
    marginTop: "48px",
  },
}));

const WithoutExceptionTeamComp = ({ teamId }) => {
  const dispatch = useDispatch();
  const team = useParamSelector(getTeamByIdSelector, { id: teamId });
  const teamMembers = team?.members ?? [];
  const selfUser = useSelector(getSelfUserSelector);
  const isAdmin = useSelector(isSelfAdmin);
  const isUserInTeam = teamMembers.includes(selfUser.id);
  const { enqueueError } = useMySnackbar();
  const captainId = team?.captain;
  const isCaptain = captainId === selfUser.id;
  const track = team?.track;
  const classes = useStyles();
  const selfStatus = selfUser.userState;
  const membersAsUsers = useParamSelector(getUsersByIdsSelector, {
    ids: teamMembers,
  });
  const isTeamSubmittable = membersAsUsers.reduce(
    (prevState, user) => user?.userState === "FILLED_FORM" && prevState,
    true
  );
  const history = useHistory();

  const handleTeamNameChange = (teamName) =>
    dispatch(putTeam({ teamId, teamName, track }))
      .then(unwrapResult)
      .catch(enqueueError);

  const handleSubmitTeam = () =>
    dispatch(submitTeam({ teamId })).then(unwrapResult).catch(enqueueError);

  const handleDeleteTeam = () =>
    dispatch(deleteTeam({ teamId }))
      .then(unwrapResult)
      .then(() => history.push("/dashboard/"))
      .catch(enqueueError);

  const handleApproveTeam = () =>
    dispatch(approveTeam({ teamId })).then(unwrapResult).catch(enqueueError);

  if (isAdmin) {
    return (
      <AdminView
        classes={classes}
        team={team}
        teamStatus={membersAsUsers[0].status}
        handleTeamNameChange={handleTeamNameChange}
        handleDeleteTeam={handleDeleteTeam}
        handleApproveTeam={handleApproveTeam}
        isTeamSubmittable={isTeamSubmittable}
      />
    );
  } else if (isCaptain) {
    return (
      <CaptainView
        classes={classes}
        team={team}
        selfStatus={selfStatus}
        isTeamSubmittable={isTeamSubmittable}
        handleTeamNameChange={handleTeamNameChange}
        handleDeleteTeam={handleDeleteTeam}
        handleSubmitTeam={handleSubmitTeam}
      />
    );
  } else if (isUserInTeam) {
    return (
      <MemberView
        classes={classes}
        team={team}
        selfStatus={selfStatus}
        isTeamSubmittable={isTeamSubmittable}
      />
    );
  } else {
    return <NotMemberView teamName={team.name} />;
  }
};

export default WithoutExceptionTeamComp;
