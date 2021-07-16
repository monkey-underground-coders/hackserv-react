import React, { useState } from "react";
import { Divider, Grid, makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { unwrapResult } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

import {
  deleteCriteria,
  getCriteriaById,
  putCriteria,
} from "@redux/voteCriteria";
import { useMySnackbar, useParamSelector } from "@utils/hooks";
import FormField from "@components/FormField";
import FormikFormControls from "@components/FormControls/FormikFormControls";
import { criteriaSchema } from "@schemas/criteria";

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
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    // color: theme.palette.text.secondary,
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

const Criteria = ({ id, editAllowed, expanded, onExpanded }) => {
  const [edit, setEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueError } = useMySnackbar();

  const selected = useParamSelector(getCriteriaById, {
    id,
  });

  const { name, maxValue } = selected;
  const description = selected.description ?? "";

  const handleEventStopPropagation = (event) => event.stopPropagation();

  const handleEditButtonClick = (event) => {
    event.stopPropagation();
    setEdit(!edit);
  };

  const handleSubmit = async (values, bag) => {
    if (!isEqual(values, { name, description, maxValue })) {
      try {
        await dispatch(putCriteria({ ...values, id })).then(unwrapResult);
      } catch (e) {
        console.error(e);
        enqueueError("Не удалось изменить критерий");
      }
    }
    setEdit(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteCriteria({ id })).then(unwrapResult);
    } catch (err) {
      console.error(err);
      enqueueError("Не удалось удалить критерий");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name, description, maxValue }}
      onSubmit={handleSubmit}
      validationSchema={criteriaSchema}
    >
      {({ submitForm, resetForm }) => (
        <Form>
          <Accordion
            expanded={expanded === id}
            onChange={onExpanded(id)}
            className={classes.root}
          >
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
                    required
                  >
                    <Typography className={classes.heading}>
                      {name} ({maxValue})
                    </Typography>
                  </FormField>
                </div>
                {editAllowed && (
                  <FormikFormControls
                    edit={edit}
                    onEdit={handleEditButtonClick}
                    isDeleting={deleting}
                    onDelete={handleDelete}
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
                    deleteProps={{
                      onFocus: handleEventStopPropagation,
                      onClick: (event) => {
                        event.stopPropagation();
                        handleDelete();
                      },
                    }}
                  />
                )}
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
                    required
                  >
                    {maxValue}
                  </FormField>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Form>
      )}
    </Formik>
  );
};

export default Criteria;
