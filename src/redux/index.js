import { combineReducers, configureStore } from "redux";
import isLogged from "./isLogged";
import users from "./users";
import auth from "./auth/slices";

export const allReducers = combineReducers({
  isLogged,
  users,
  auth
});

const store = configureStore({
  reducer: allReducers
});

export default store;
