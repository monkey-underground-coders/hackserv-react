import React from "react";
import { useDispatch } from "react-redux";

import { logout } from "@redux/auth";
import { Link } from "@material-ui/core";

const Logout = () => {
  const dispatch = useDispatch();

  const makeLogout = (event) => {
    event.preventDefault();
    return dispatch(logout());
  };

  return (
    <Link href="#" onClick={makeLogout}>
      Выйти
    </Link>
  );
};

export default Logout;
