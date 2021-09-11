import React from "react";

import CenteredPaper from "@components/CenteredPaper";
import { Button } from "@material-ui/core";
import TeamMembersList from "../../TeamMembersList";
import Title from "@components/Title";

const MemberView = ({ classes, team, selfStatus, isTeamSubmittable }) => {
  const teamMembers = team.members ?? [];
  const teamId = team.id;
  const captainId = team.captain;
  const teamName = team.name;
  const buttonText = (() => {
    switch (selfStatus) {
      case "FILLED_FORM":
        return isTeamSubmittable
          ? "Капитан может отправить заявку"
          : "Участник не заполнил форму";
      case "SUBMITTED":
        return "Ожидание подтверждения";
      case "APPROVED":
        return "Команда подтверждена";
      default:
        return "Вы не заполнили форму";
    }
  })();

  return (
    <>
      <CenteredPaper>
        <Title gutterBottom={false}>{teamName}</Title>
      </CenteredPaper>
      <CenteredPaper>
        <TeamMembersList
          teamId={teamId}
          members={teamMembers}
          captainId={captainId}
          isCaptain={false}
        ></TeamMembersList>
      </CenteredPaper>
      <div className={classes.button}>
        <Button variant="contained" color="primary" disabled={true}>
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default MemberView;
