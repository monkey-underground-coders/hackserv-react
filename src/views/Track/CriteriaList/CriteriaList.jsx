import React, { useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Criteria from "../Criteria";
import SecondaryTitle from "@components/SecondaryTitle";
import CreateCriteriaDialog from "../CreateCriteriaDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
}));

const CriteriaList = ({ trackId, criteriaIdsList, editAllowed }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCreateCriteriaCancel = () => setOpen(false);

  const handleAddCriteriaClick = () => setOpen(true);

  const handleCreateCriteriaSubmitted = () => setOpen(false);

  const handleExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <SecondaryTitle>Критерии оценки</SecondaryTitle>
          {editAllowed && (
            <IconButton onClick={handleAddCriteriaClick}>
              <AddIcon />
            </IconButton>
          )}
        </div>
        {criteriaIdsList.map((id) => (
          <Criteria
            id={id}
            key={id}
            editAllowed={editAllowed}
            expanded={expanded}
            onExpanded={handleExpanded}
          />
        ))}
      </div>
      <CreateCriteriaDialog
        open={open}
        onCancel={handleCreateCriteriaCancel}
        trackId={trackId}
        onSubmitted={handleCreateCriteriaSubmitted}
      />
    </>
  );
};

export default CriteriaList;
