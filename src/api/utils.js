import { setTokens } from "@redux/auth/actions";
import * as axios from "axios";
import { Ip } from "@config";

const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

export const basicAxios = () =>
  axios.create({
    baseURL: Ip(),
    headers: defaultBodyHeaders,
  });

export const axiosWithBasic = (email, password) =>
  axios.create({
    baseURL: Ip(),
    headers: defaultBodyHeaders,
    auth: {
      username: email,
      password,
    },
  });

export const mainAxios = axios.create({
  baseURL: Ip(),
  headers: defaultBodyHeaders,
});

export const localStorageTokensSet = (store, tokensBag) => {
  const { accessToken, refreshToken } = tokensBag;

  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);

  store.dispatch(setTokens(tokensBag));
};
