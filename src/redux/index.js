import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  createWrappedAuthApiInterceptor,
  createWrappedApiInterceptor,
} from "@api/helpers";
import isLogged from "./isLogged";
import users from "./users";
import authReducer from "./auth/slices";

const store = (() => {
  const reducer = combineReducers({
    isLogged,
    users,
    auth: authReducer,
  });

  const store = configureStore({ reducer });

  createWrappedApiInterceptor(store);
  createWrappedAuthApiInterceptor(store);

  return store;
})();

export default store;
