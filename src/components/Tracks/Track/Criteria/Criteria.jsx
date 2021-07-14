import React, { useState } from "react";
import { Box, Divider, Grid, IconButton, makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

import { getCriteriaById } from "@redux/voteCriteria";
import { useParamSelector } from "@utils/hooks";
import FormField from "@components/FormField";
import { Form, Formik } from "formik";
import FormikFormControls from "@components/FormControls/FormikFormControls";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordionDetails: {
    flexDirection: "column",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  description: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
  },
  empty: {
    fontSize: theme.typography.pxToRem(12),
    textAlign: "center",
    color: theme.palette.text.disabled,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    // width: "100%",
    flexGrow: 1,
  },
}));

const Criteria = ({ id, editAllowed }) => {
  const { name, description, maxValue } = useParamSelector(getCriteriaById, {
    id,
  });
  const classes = useStyles();

  const [edit, setEdit] = useState(false);

  const handleEventStopPropagation = (event) => event.stopPropagation();

  const handleEditButtonClick = (event) => {
    event.stopPropagation();
    setEdit(!edit);
  };

  return (
    <Formik
      initialValues={{ name, description, maxValue }}
      onSubmit={(values, bag) => {
        console.log(values);
        setEdit(!edit);
        return Promise.resolve();
      }}
    >
      {({ submitForm, resetForm }) => (
        <Accordion className={classes.root}>
          <Form>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className={classes.header}>
                <div className={classes.headerTitle}>
                  <FormField
                    edit={edit}
                    name="name"
                    label="Название"
                    aria-label="Название"
                    onClick={handleEventStopPropagation}
                    onFocus={handleEventStopPropagation}
                    fullWidth
                  >
                    <Typography className={classes.heading}>
                      {name} ({maxValue})
                    </Typography>
                  </FormField>
                </div>
                <FormikFormControls
                  edit={edit}
                  onEdit={handleEditButtonClick}
                  resetProps={{
                    onFocus: handleEventStopPropagation,
                    onClick: (event) => {
                      event.stopPropagation();
                      resetForm();
                    },
                  }}
                  submitProps={{
                    onFocus: handleEventStopPropagation,
                    onClick: (event) => {
                      event.stopPropagation();
                      submitForm();
                    },
                  }}
                />
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <FormField
                edit={edit}
                name="description"
                label="Описание"
                multiline
                fullWidth
              >
                {description ? (
                  <Typography className={classes.description}>
                    {description}
                  </Typography>
                ) : (
                  <Typography className={classes.empty}>
                    Описание пусто
                  </Typography>
                )}
              </FormField>
              <Divider className={classes.divider} />
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  Максимальное количество баллов
                </Grid>
                <Grid item xs={6}>
                  <FormField
                    edit={edit}
                    name="maxValue"
                    label="Числовое значение"
                    type="number"
                    fullWidth
                  >
                    {maxValue}
                  </FormField>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Form>
        </Accordion>
      )}
    </Formik>
  );
};

export default Criteria;
