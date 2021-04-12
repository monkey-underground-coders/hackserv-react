import createAuthRefreshInterceptor from "axios-auth-refresh";

import {
  refreshTokenSelector,
  accessTokenSelector,
} from "@redux/auth/selectors";
import { mainAxios } from "./utils";
import { logout } from "@redux/auth/slices";
import { jwt } from "@utils";

const getAccessToken = (store) => accessTokenSelector(store.getState());

export const createWrappedAuthApiInterceptor = (store) => {
  const refreshAuthLogic = (failedRequest) =>
    mainAxios
      .post(
        "/auth/get_access",
        {
          refreshToken: refreshTokenSelector(store.getState()),
        },
        { skipAuthRefresh: true }
      )
      .then((res) => {
        jwt.localStorageTokensSet(store, res.data);
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + getAccessToken(store);
        return Promise.resolve();
      })
      .catch((e) => {
        console.error(e);
        store.dispatch(logout());
        jwt.localStorageTokensErase();
      });

  createAuthRefreshInterceptor(mainAxios, refreshAuthLogic);
};

export const createWrappedApiInterceptor = (store) => {
  mainAxios.interceptors.request.use((request) => {
    request.headers["Authorization"] = `Bearer ${getAccessToken(store)}`;
    return request;
  });
};
