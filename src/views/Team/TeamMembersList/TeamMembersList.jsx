import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Member from "../Member";
import SecondaryTitle from "@components/SecondaryTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const TeamMembersList = ({ teamId, members, captainId, isCaptain }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <SecondaryTitle>Члены команды</SecondaryTitle>
        <List component="article" aria-label="Team members">
          {members.map((id) => (
            <Member key={id} uid={id} teamId={teamId} captainId={captainId} isCaptain={isCaptain}/>
          ))}
        </List>
      </div>
    </>
  );
};

export default TeamMembersList;
