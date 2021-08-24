import React from "react";

import CenteredPaper from "@components/CenteredPaper";
import SingleEditableField from "@components/SingleEditableField";
import { titleSchemaTeam } from "@validation/yup/teams";
import { Button } from "@material-ui/core";
import TeamMembersList from '../../TeamMembersList';

const AdminView = ({ teamId, classes, team, teamMembers, isTeamSubmittable, handleTeamNameChange, handleApproveTeam, handleDeleteTeam, teamStatus }) => {
    const captainId = team?.captain;
    const teamName = team?.name;
    const buttonText = isTeamSubmittable ? 'Команда не отправила заявку' : (() => {switch (teamStatus) {
      case 'SUBMITTED':
        return 'Подтвердить';
      case 'APPROVED':
        return 'Команда подтверждена';
      default:
        return 'Участник не заполнил форму';
    }})();

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
            fullWidth
          />
        </CenteredPaper>
        <CenteredPaper>
          <TeamMembersList
            teamId={teamId}
            members={teamMembers}
            captainId={captainId}
            isCaptain={true}
          ></TeamMembersList>
        </CenteredPaper>
        <div className={classes.button}>
        <Button variant="contained" color="primary" onClick={handleApproveTeam} disabled={!(teamStatus === 'SUBMITTED')}>
            {buttonText}
        </Button>
        </div>
        <div className={classes.button}>
        <Button variant="contained" color="secondary" onClick={handleDeleteTeam}>
            Удалить команду
        </Button>
        </div>
      </>
    );
  };
  
  export default AdminView;
  