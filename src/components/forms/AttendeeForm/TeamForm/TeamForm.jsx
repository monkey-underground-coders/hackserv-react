import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Accordion from "./Accordion";
import { StepperNavBar } from "@components/StepperPage";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function TeamForm() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Выбор или создание команды
      </Typography>

      <Accordion />

      <StepperNavBar />
    </>
  );
}
