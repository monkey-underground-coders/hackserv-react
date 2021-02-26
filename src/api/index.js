import * as axios from "axios";
import { Ip } from "../config";


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

const mainAxios = (access) => axios.create({
  baseURL: Ip(),
  headers: { 
    ...defaultBodyHeaders,
    Authorization: `Bearer ${access}`
  }
});

const localStorageTokensSet = (accessToken, refreshToken) => {
  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);
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
      localStorageTokensSet(res.data.accessToken, res.data.refreshToken);
      return res.data;
    });

export const updateAccessTokenPost = (refreshToken) => 
  basicAxios()
    .post("/auth/get_access", {
      refreshToken,
    })
    .then((res) => {
      localStorageTokensSet(res.data.accessToken, res.data.refreshToken);
      return res.data;
    });