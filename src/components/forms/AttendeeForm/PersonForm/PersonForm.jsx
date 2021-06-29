import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Formik } from "formik";
import { LinearProgress } from "@material-ui/core";

import UserInfoForm from "./UserInfoForm";
import ResumeForm from "./ResumeForm";
import { StepperNavBar } from "@components/StepperPage";
import { userDetailedInfoSchema } from "@schemas";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    marginTop: "20px",
    marginBottom: "20px",
  },
}));

const PersonForm = ({ user }) => {
  const classes = useStyles();

  const yesterday = (() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  })();

  const onSubmit = (values, bag) => {}; // TODO: make logic

  return (
    <Formik
      initialValues={{
        dateOfBirth: `${yesterday.getFullYear()}-${
          yesterday.getMonth() + 1
        }-${yesterday.getDate()}`,
        ...user,
      }}
      validationSchema={userDetailedInfoSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <UserInfoForm />
          <Divider variant="fullWidth" className={classes.divider} />
          <ResumeForm user={user} allowUpload={true} />
          <StepperNavBar />
          {isSubmitting && <LinearProgress />}
        </form>
      )}
    </Formik>
  );
};

export default PersonForm;
