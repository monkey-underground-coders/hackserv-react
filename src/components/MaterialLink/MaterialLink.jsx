import React from "react";
import { Link, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const MaterialLink = ({ disabled, onClick, children, ...rest }) => {
  if (disabled) {
    return (
      <Typography variant="body2" component="span" color={grey[500]} {...rest}>
        {children}
      </Typography>
    );
  } else {
    return (
      <Link
        onClick={onClick}
        component="button"
        variant="body2"
        color="primary"
        {...rest}
      >
        {children}
      </Link>
    );
  }
};

export default MaterialLink;
