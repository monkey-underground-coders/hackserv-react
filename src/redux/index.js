import { combineReducers } from "redux";
import isLogged from "./isLogged";
import users from "./users";
import auth from "./auth/slices";

const allReducers = combineReducers({
  isLogged,
  users,
  auth
});

export default allReducers;
