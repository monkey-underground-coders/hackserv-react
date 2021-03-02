import * as axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { Ip } from "../config";
import store from "@redux";
import { setTokens } from "@redux/auth/slices";
import { refreshTokenSelector, accessTokenSelector } from "@redux/auth/selectors";

const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

const basicAxios = () => axios.create({
  baseURL: Ip(),
  headers: defaultBodyHeaders
});

const axiosWithBasic = (email, password) => axios.create({
  baseURL: Ip(),
  headers: defaultBodyHeaders,
  auth: {
    username: email,
    password
  }
});


const localStorageTokensSet = (tokensBag) => {
  const {
    accessToken,
    refreshToken
  } = tokensBag;

  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);

  store.dispatch(setTokens(tokensBag));
}

export const signupPost = (userEmail, userPassword) =>
  basicAxios()
    .post("/user/create", {
      email: userEmail,
      password: userPassword,
    })
    .then((res) => {
      const user = res.data;
      console.log(user);
      return user;
    });

export const loginPost = (userEmail, userPassword) => 
  axiosWithBasic(userEmail, userPassword)
    .post("/auth/convert")
    .then((res) => { 
      localStorageTokensSet(res.data);
      return res.data;
    });

export const updateAccessTokenPost = (refreshToken) => 
  basicAxios()
    .post("/auth/get_access", {
      refreshToken,
    })
    .then((res) => {
      localStorageTokensSet(res.data);
      return res.data;
    });


// const refreshAuthLogic = failedRequest => axios.post('https://www.example.com/auth/token/refresh').then(tokenRefreshResponse => {
//     localStorage.setItem('token', tokenRefreshResponse.data.token);
//     failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
//     return Promise.resolve();
// });

const getAccessToken = () => accessTokenSelector(store.getState());

const mainAxios = axios.create({
  baseURL: Ip(),
  headers: defaultBodyHeaders
});

const refreshAuthLogic = failedRequest => mainAxios.post("/auth/get_access", {
  refreshToken: refreshTokenSelector(store.getState())
}, { skipAuthRefresh: true }).then(res => {
  localStorageTokensSet(res.data);
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + getAccessToken();
  return Promise.resolve();
})

createAuthRefreshInterceptor(mainAxios, refreshAuthLogic);

mainAxios.interceptors.request.use(request => {
  request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  return request;
});

