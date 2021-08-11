import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Member from "../Member";
import SecondaryTitle from "@components/SecondaryTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
}));

const TeamMembersList = ({ teamId, members, isCaptain }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <SecondaryTitle>Члены команды</SecondaryTitle>
        </div>
        {members.map((id) => (
          <Member key={id} id={id} />
        ))}
      </div>
    </>
  );
};

export default TeamMembersList;
