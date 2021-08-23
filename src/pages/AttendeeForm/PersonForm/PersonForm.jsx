import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Formik } from "formik";
import { Container, Grid, LinearProgress } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { pick, mapValues } from "lodash";

import UserInfoForm from "./UserInfoForm";
import ResumeForm from "./ResumeForm";
import { userDetailedInfoSchema } from "@validation/yup";
import { useDispatch } from "react-redux";
import { setUserFilledForm, userPutData } from "@redux/users";
import { useMySnackbar } from "@utils/hooks";
import { UserState } from "@dictionary/user";
import UrlStepperNavBar from "@components/UrlStepperPage/UrlStepperNavBar";
import UrlStepContext from "@components/UrlStepperPage/UrlStepContext";
import Logout from "@components/Logout";

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
  const dispatch = useDispatch();

  const yesterday = (() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  })();

  const { handleNext } = useContext(UrlStepContext);

  const { enqueueError } = useMySnackbar();

  const onSubmit = (userInfo, bag) =>
    dispatch(
      userPutData({
        userId: user.id,
        userInfo: mapValues(userInfo, (v) => (v ? v.trim() : v)),
      })
    )
      .then(unwrapResult)
      .then(
        () =>
          user.userState === UserState.REGISTERED &&
          dispatch(setUserFilledForm({ userId: user.id })).then(unwrapResult)
      )
      .then(() => handleNext())
      .catch(enqueueError);

  return (
    <Formik
      initialValues={{
        dateOfBirth:
          user.dateOfBirth ??
          `${yesterday.getFullYear()}-${
            yesterday.getMonth() + 1
          }-${yesterday.getDate()}`,
        ...mapValues(
          pick(user, [
            "firstName",
            "middleName",
            "lastName",
            "telegram",
            "workPlace",
            "resume",
            "otherInfo",
          ]),
          (v) => v ?? ""
        ),
      }}
      validationSchema={userDetailedInfoSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <UserInfoForm />
          <Divider variant="fullWidth" className={classes.divider} />
          <ResumeForm user={user} allowUpload={true} />
          <UrlStepperNavBar noNextLink />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={3}>
              <Logout />
            </Grid>
          </Grid>
          {isSubmitting && <LinearProgress />}
        </form>
      )}
    </Formik>
  );
};

export default PersonForm;
