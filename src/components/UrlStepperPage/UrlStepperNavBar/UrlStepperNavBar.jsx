import React, { useContext } from "react";
import { Button, makeStyles } from "@material-ui/core";

import UrlStepContext from "../UrlStepContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const UrlStepperNavBar = ({
  nextTo,
  noNextLink = false,
  onNextClick = undefined,
  disableNext = false,
}) => {
  const classes = useStyles();
  const { step, steps, nextStepUrl, prevStepUrl } = useContext(UrlStepContext);

  const nextButton = (
    <Button
      variant="contained"
      color="primary"
      type={!onNextClick && "submit"}
      className={classes.button}
      onClick={onNextClick}
      disabled={disableNext}
    >
      {step === steps.length - 1 ? "Завершить" : "Следующий"}
    </Button>
  );

  return (
    <div className={classes.buttons}>
      {step !== 0 && (
        <Link to={prevStepUrl}>
          <Button className={classes.button}>Назад</Button>
        </Link>
      )}
      {!noNextLink ? (
        <Link to={nextTo ?? nextStepUrl}>{nextButton}</Link>
      ) : (
        nextButton
      )}
    </div>
  );
};

export default UrlStepperNavBar;
