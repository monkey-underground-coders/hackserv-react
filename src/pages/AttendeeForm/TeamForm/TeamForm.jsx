import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Accordion from "./Accordion";
import UrlStepperNavBar from "@components/UrlStepperPage/UrlStepperNavBar";
import UserBar from "@components/UserBar";

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
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Выбор или создание команды
      </Typography>

      <Accordion />

      <UrlStepperNavBar disableNext />
    </>
  );
}
