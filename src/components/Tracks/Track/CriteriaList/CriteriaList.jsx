import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import Criteria from "../Criteria";
import Title from "@components/Title";
import SecondaryTitle from "@components/SecondaryTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const CriteriaList = ({ criteriaIdsList, editAllowed }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <SecondaryTitle>Критерии оценки</SecondaryTitle>
      </div>
      {criteriaIdsList.map((id) => (
        <Criteria id={id} editAllowed={editAllowed} />
      ))}
    </div>
  );
};

export default CriteriaList;
