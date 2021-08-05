import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";

export default function Copyright() {
  return (
    <Typography variant="body2" align="center">
      <Link
        color="inherit"
        variant="body2"
        href="https://github.com/monkey-underground-coders"
        rel="noreferrer"
        underline="hover"
      >
        © {new Date().getFullYear()} Monkey Underground Coders
      </Link>
    </Typography>
  );
}
