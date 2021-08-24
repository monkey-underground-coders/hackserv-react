import React from "react";

import CenteredPaper from "@components/CenteredPaper";
import SingleEditableField from "@components/SingleEditableField";
import { titleSchemaTeam } from "@validation/yup/teams";
import { Button } from "@material-ui/core";
import TeamMembersList from '../../TeamMembersList';

const CaptainView = ({ teamId, classes, team, teamMembers, selfStatus, isTeamSubmittable }) => {
    const captainId = team?.captain;
    const teamName = team?.name;
    const buttonText = (() => {switch (selfStatus) {
      case 'FILLED_FORM':
        return isTeamSubmittable ? 'Капитан может отправить заявку' : 'Участник не заполнил форму';
      case 'SUBMITTED':
        return 'Ожидание подтверждения';
      case 'APPROVED':
        return 'Команда подтверждена';
      default:
        return 'Вы не заполнили форму';
    }})();

    return (
      <>
        <CenteredPaper>
          <SingleEditableField
            initialValue={teamName}
            normalComponentProps={{
              gutterBottom: false,
            }}
            name="name"
            validationSchema={titleSchemaTeam}
            fullWidth
          />
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
  
  export default CaptainView;
  