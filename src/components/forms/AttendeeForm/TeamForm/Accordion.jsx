import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";

import SelectTeam from "@components/SelectTeam";
import { useDispatch, useSelector } from "react-redux";
import { getSelfUserSelector } from "@redux/users";
import { teamCreate } from "@redux/teams";
import { unwrapResult } from "@reduxjs/toolkit";
import ActionButton from "@components/ActionButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const { id: captainId } = useSelector(getSelfUserSelector);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCreateTeam = (values) =>
    dispatch(teamCreate({ ...values, captainId })).then(unwrapResult);

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Стать капитаном</Typography>
          <Typography className={classes.secondaryHeading}>
            Создание команды
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            onSubmit={handleCreateTeam}
          >
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    required
                    name="name"
                    label="Название команды"
                    fullWidth
                    autoComplete="no"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    required
                    name="descriptionTeam"
                    label="О команде"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Создать
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Стать участником</Typography>
          <Typography className={classes.secondaryHeading}>
            Присоединиться к команде
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <SelectTeam />
            </Grid>
            <Grid item xs={12}>
              <ActionButton
                component={Button}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Присоедениться
              </ActionButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
