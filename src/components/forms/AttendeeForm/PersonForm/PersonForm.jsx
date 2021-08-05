import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Formik } from "formik";
import { LinearProgress } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { pick, mapValues } from "lodash";

import UserInfoForm from "./UserInfoForm";
import ResumeForm from "./ResumeForm";
import { StepContext, StepperNavBar } from "@components/StepperPage";
import { userDetailedInfoSchema } from "@schemas";
import { useDispatch } from "react-redux";
import { setUserFilledForm, userPutData } from "@redux/users";
import { useMySnackbar } from "@utils/hooks";
import { UserState } from "@dictionary/user";

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

  const { handleNext } = useContext(StepContext);

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
  // const onSubmit = async () => handleNext();\
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
          <StepperNavBar jumpOnNextOnClick={false} />
          {isSubmitting && <LinearProgress />}
        </form>
      )}
    </Formik>
  );
};

export default PersonForm;
