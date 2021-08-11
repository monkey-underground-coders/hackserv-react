import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import CenteredPaper from "@components/CenteredPaper";
import SingleEditableField from "@components/SingleEditableField";
import TeamMembersList from "./TeamMembersList";
import { useMySnackbar } from "@utils/hooks";
import { getSelfUserSelector } from "@redux/users";
import { putTeam, getTeamById } from "@redux/teams";
import { titleSchemaTeam } from "@validation/yup/teams";
import { withReduxRenderFetch } from "@components/RenderFetch/ReduxRenderFetch/ReduxRenderFetch";

const MyTeam = () => {
  const dispatch = useDispatch();
  const user = useSelector(getSelfUserSelector);
  const captainId = user.team?.captain;
  const teamName = user.team?.name;
  const track = user.team?.track;
  const teamId = user.team?.id;
  const isCaptain = captainId === user.id;
  const teamMembers = user.team?.members;
  const { enqueueError } = useMySnackbar();

  const handleTeamNameChange = (teamName) =>
    console.log('1');
    // dispatch(putTeam({ teamId, teamName, track }))
    //     .then(unwrapResult)
    //     .catch(enqueueError);

  return (
    <>
      <CenteredPaper>
        <SingleEditableField
          initialValue={teamName}
          onSubmit={handleTeamNameChange}
          normalComponentProps={{
            gutterBottom: false,
          }}
          name="teamName"
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

export default withReduxRenderFetch(MyTeam, () => getTeamById({id: 450}));
