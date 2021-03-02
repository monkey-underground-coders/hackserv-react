import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import isLogged from "./isLogged";
import users from "./users";
import { auth } from "./auth/slices";

console.log("meow");
console.log(auth);

export const allReducers = combineReducers({
  isLogged,
  users,
  auth: auth.reducer
});

const store = configureStore({
  reducer: allReducers
});

export default store;
