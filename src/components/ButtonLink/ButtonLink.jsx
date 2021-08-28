import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const ButtonLink = ({ children, to, ...rest }) => (
  <Button component={Link} to={to} {...rest}>
    {children}
  </Button>
);

export default ButtonLink;
