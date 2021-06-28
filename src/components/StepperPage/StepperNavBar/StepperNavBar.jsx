import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import { StepContext } from "../StepperPage";

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

const StepperNavBar = () => {
  const classes = useStyles();
  const { currentStep, steps, handleNext, handleBack } =
    useContext(StepContext);

  return (
    <div className={classes.buttons}>
      {currentStep !== 0 && (
        <Button onClick={handleBack} className={classes.button}>
          Назад
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleNext}
        className={classes.button}
      >
        {currentStep === steps.length - 1 ? "Завершить" : "Следующий"}
      </Button>
    </div>
  );
};

export default StepperNavBar;
