import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import UserInfoForm from "@components/forms/UserInfoForm";
import ResumeForm from "@components/forms/ResumeForm";

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

  return (
    <div className={classes.root}>
      <UserInfoForm user={user} />
      <Divider variant="fullWidth" className={classes.divider} />
      <ResumeForm user={user} allowUpload={true} />
    </div>
  );
};

export default PersonForm;
