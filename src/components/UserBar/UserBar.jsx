import Logout from "@components/Logout";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { getSelfUserSelector } from "@redux/users";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    textAlign: "center",
    padding: theme.spacing(1),
    "& > *": {
      padding: theme.spacing(1),
    },
  },
}));

const UserBar = () => {
  const { email } = useSelector(getSelfUserSelector);
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.gridContainer}
      component="footer"
    >
      <Grid item xs={12} sm={2}>
        <Typography variant="caption" display="block" noWrap>
          {email}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Logout />
      </Grid>
    </Grid>
  );
};

export default UserBar;
