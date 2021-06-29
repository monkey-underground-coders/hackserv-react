import { Typography } from "@material-ui/core";
import React from "react";
import StepperPage from "../StepperPage";

const Ending = ({ title, text }) => (
  <>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Typography variant="subtitle1">{text}</Typography>
  </>
);

const DefaultStepperPage = (props) => (
  <StepperPage
    ending={<Ending title={props.endingTitle} text={props.endingText} />}
    {...props}
  />
);

export default DefaultStepperPage;
