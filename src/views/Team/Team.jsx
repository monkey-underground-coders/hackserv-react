import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import CenteredPaper from "@components/CenteredPaper";
import SingleEditableField from "@components/SingleEditableField";
import TeamMembersList from "./TeamMembersList";
import { useMySnackbar, useParamSelector } from "@utils/hooks";
import { getSelfUserSelector, getUserByIdSelector, getUsersByIdsSelector } from "@redux/users";
import {
  putTeam,
  getTeamById,
  getTeamByIdSelector,
  submitTeam,
  deleteTeam,
} from "@redux/teams";
import { titleSchemaTeam } from "@validation/yup/teams";
import { withEntityRenderFetch } from "@components/RenderFetch/EntityRenderFetch";
import { Button, makeStyles } from "@material-ui/core";

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
  const { enqueueError } = useMySnackbar();
  const captainId = team.captain;
  const selfUser = useSelector(getSelfUserSelector);
  const isCaptain = captainId === selfUser.id;
  const teamName = team.name;
  const track = team.track;
  const teamMembers = team.members;
  const classes = useStyles();
  const teamStatus = selfUser.userState;
  const membersAsUsers = useParamSelector(getUsersByIdsSelector, {ids: teamMembers});
  const isTeamSubmittable = membersAsUsers.reduce((prevState, user) => user.userState === 'FILLED_FORM' && prevState, true);
  console.log(isTeamSubmittable);
  let buttonText = 'Отправить заявку';
  switch (teamStatus) {
    case 'FILLED_FORM':
      buttonText = isTeamSubmittable ? 'Отправить заявку' : 'Участник не заполнил форму';
      break;
    case 'SUBMITTED':
      buttonText = 'Ожидание подтверждения';
      break;
    case 'APPROVED':
      buttonText = 'Команда подтверждена';
      break;
    default:
      buttonText = 'Вы не заполнили форму';
      break;
  }

  const handleTeamNameChange = (teamName) =>
    dispatch(putTeam({ teamId, teamName, track }))
      .then(unwrapResult)
      .catch(enqueueError);

  const handleSubmitTeam = () =>
    dispatch(submitTeam({ teamId })).then(unwrapResult).catch(enqueueError);

  const handleDeleteTeam = () =>
    dispatch(deleteTeam({ teamId })).then(unwrapResult).catch(enqueueError);

  return (
    <>
      <CenteredPaper>
        <SingleEditableField
          initialValue={teamName}
          onSubmit={handleTeamNameChange}
          normalComponentProps={{
            gutterBottom: false,
          }}
          name="name"
          validationSchema={titleSchemaTeam}
          disableEdit={!isCaptain}
          fullWidth
        />
      </CenteredPaper>
      <CenteredPaper>
        <TeamMembersList
          teamId={teamId}
          members={teamMembers}
          captainId={captainId}
          isCaptain={isCaptain}
        ></TeamMembersList>
      </CenteredPaper>
      <div className={classes.button}>
        <Button variant="contained" color="primary" onClick={handleSubmitTeam} disabled={!isTeamSubmittable || !isCaptain}>
          {buttonText}
        </Button>
      </div>
      {isCaptain && (
        <div className={classes.button}>
          <Button variant="contained" color="secondary" onClick={handleDeleteTeam}>
            Удалить команду
          </Button>
        </div>
      )}
    </>
  );
};

export default withEntityRenderFetch(Team, "teamId", getTeamById);
