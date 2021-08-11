import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import CenteredPaper from "@components/CenteredPaper";
import SingleEditableField from "@components/SingleEditableField";
import TeamMembersList from "./TeamMembersList";
import { useMySnackbar, useParamSelector } from "@utils/hooks";
import { getSelfUserSelector } from "@redux/users";
import { putTeam, getTeamById, getTeamByIdSelector } from "@redux/teams";
import { titleSchemaTeam } from "@validation/yup/teams";
import { withEntityRenderFetch } from "@components/RenderFetch/EntityRenderFetch";

const Team = ({ teamId }) => {
  const dispatch = useDispatch();
  const team = useParamSelector(getTeamByIdSelector, { id: teamId });
  const { enqueueError } = useMySnackbar();
  const captainId = team.captain;
  const isCaptain = captainId === useSelector(getSelfUserSelector).id;
  const teamName = team.name;
  const track = team.track;
  const teamMembers = team.members;

  const handleTeamNameChange = (teamName) =>
    dispatch(putTeam({ teamId, teamName, track }))
        .then(unwrapResult)
        .catch(enqueueError);

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
              isCaptain={isCaptain}>
          </TeamMembersList>
      </CenteredPaper>
    </>
  );
};

export default withEntityRenderFetch(Team, "teamId", getTeamById);
