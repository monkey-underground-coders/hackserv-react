import React, { forwardRef } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const ButtonRef = forwardRef((props, ref) => (
  <Button ref={ref} {...props}>
    {props.children}
  </Button>
));

const ButtonLink = (props) => (
  <Link to={props.to} component={ButtonRef} {...props} />
);

export default ButtonLink;
