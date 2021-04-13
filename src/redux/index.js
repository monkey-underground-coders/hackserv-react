import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  createWrappedAuthApiInterceptor,
  createWrappedApiInterceptor,
} from "@api/helpers";
import users from "./users";
import conf from "./conf";
import authReducer from "./auth/slices";

const store = (() => {
  const reducer = combineReducers({
    users,
    conf,
    auth: authReducer,
  });

  const store = configureStore({ reducer });

  createWrappedApiInterceptor(store);
  createWrappedAuthApiInterceptor(store);

  return store;
})();

export default store;
